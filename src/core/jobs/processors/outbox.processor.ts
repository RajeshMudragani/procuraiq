import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import {
  Job,
  Worker,
} from 'bullmq';

import { OutboxService } from '../../outbox/outbox.service';
import { EventsService } from '../../events/events.service';
import { EventRoutingMap } from '../../events/contracts/common/event-routing-map';
import { EventTypes } from '../../events/contracts/common/event-types';

@Injectable()
export class OutboxProcessor
  implements OnModuleInit
{
  private readonly logger =
    new Logger(
      OutboxProcessor.name,
    );

  constructor(
    private readonly outboxService: OutboxService,
    private readonly eventsService: EventsService,
  ) {}

  onModuleInit() {

    new Worker(
      'outbox',

      async (job: Job) => {

        const {
          outboxEventId,
        } = job.data;

        const outboxEvent = await this.outboxService.findById(
          outboxEventId,
        );

        if (!outboxEvent) {
          return;
        }

        if (
          outboxEvent.processed
        ) {
          return;
        }

        const eventType = outboxEvent.eventType as EventTypes;

        const routingKey = EventRoutingMap[eventType];

        await this.eventsService.publish(
          routingKey,
          outboxEvent.payload,
        );

        await this.outboxService.markProcessed(
          outboxEvent.id,
        );
      },

      {
        connection: {
          host:
            process.env.REDIS_HOST ??
            'localhost',

          port: Number(
            process.env.REDIS_PORT ??
            6379,
          ),
        },
      },
    );
  }
}