import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import { JobProducer } from './producers/job.producer';
import { OutboxProcessor } from './processors/outbox.processor';

@Injectable()
export class JobsService
  implements OnModuleInit
{
    private readonly logger = new Logger(JobsService.name);

    constructor(
        private readonly producer: JobProducer,
        private readonly outboxProcessor: OutboxProcessor,
    ) {}

    onModuleInit() {
        this.logger.log(
            'JobsService started',
        );
    }

    async enqueueOutboxEvent(
        eventId: string,
    ): Promise<void> {
        await this.producer.enqueueOutbox(
            eventId,
        );
    }
}