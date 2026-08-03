import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import { RabbitMqService } from '../rabbitmq.service';

import { QueueNames } from '../contracts/common/queue-names';

@Injectable()
export class NotificationConsumer
  implements OnModuleInit
{
    private readonly logger =
        new Logger(
        NotificationConsumer.name,
        );

    constructor(
        private readonly rabbitMqService: RabbitMqService,
    ) {}

    async onModuleInit() {
        const channel = this.rabbitMqService.getChannel();

        await this.rabbitMqService.assertQueue(
            QueueNames.NOTIFICATION,
        );

        await this.rabbitMqService.bindQueue(
            QueueNames.NOTIFICATION,
            'user.*',
        );

        await channel.consume(
            QueueNames.NOTIFICATION,
            async (message) => {
                if (!message) {
                    return;
                }

                const payload = JSON.parse(message.content.toString());

                this.logger.log(
                    'Notification Event Received',
                );

                channel.ack(message);
            },
        );
    }
}