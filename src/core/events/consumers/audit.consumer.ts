import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import { RabbitMqService } from '../rabbitmq.service';
import { QueueNames } from '../contracts/common/queue-names';

@Injectable()
export class AuditConsumer
    implements OnModuleInit
{
    private readonly logger =
        new Logger(
            AuditConsumer.name,
        );

    constructor(
        private readonly rabbitMqService: RabbitMqService,
    ) {}

    async onModuleInit() {
        const channel = this.rabbitMqService.getChannel();

        await this.rabbitMqService.assertQueue(
            QueueNames.AUDIT,
        );

        await this.rabbitMqService.bindQueue(
            QueueNames.AUDIT,
            '#',
        );

        await channel.consume(
            QueueNames.AUDIT,
            async (message) => {
                if (!message) {
                    return;
                }

                const payload = JSON.parse(message.content.toString());

                this.logger.log(`Audit Event Received`);

                console.log(payload);

                channel.ack(message);
            },
        );
    }
}