import {
    Injectable,
    Logger,
    OnModuleInit,
} from '@nestjs/common';

import { RabbitMqService } from '../rabbitmq.service';

import { QueueNames } from '../contracts/common/queue-names';
import { NotificationHandler } from '../handlers/notification.handler';

@Injectable()
export class NotificationConsumer
    implements OnModuleInit
{
    private readonly logger = new Logger(
            NotificationConsumer.name,
        );

    constructor(
        private readonly rabbitMqService: RabbitMqService,
        private readonly notificationHandler: NotificationHandler,
    ) {}

    async onModuleInit() {
        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    2000,
                ),
        );

        const channel = this.rabbitMqService.getChannel();

        await this.rabbitMqService.assertQueue(
            QueueNames.NOTIFICATION,
        );

        await this.rabbitMqService.bindQueue(
            QueueNames.NOTIFICATION,
            'user.*',
        );

        await this.rabbitMqService.bindQueue(
            QueueNames.NOTIFICATION,
            'tenant.*',
        );

        await this.rabbitMqService.bindQueue(
            QueueNames.NOTIFICATION,
            'role.*',
        );

        await this.rabbitMqService.bindQueue(
            QueueNames.NOTIFICATION,
            'permission.*',
        );

        this.logger.log(
            'Notification consumer started',
        );

        await channel.consume(
            QueueNames.NOTIFICATION,

            async (
                message,
            ) => {
                if (!message) {
                    return;
                }

                try {

                    const payload = JSON.parse(
                            message.content.toString(),
                        );

                    const routingKey = message.fields.routingKey;

                    await this.notificationHandler.handle(
                        routingKey,
                        payload,
                    );

                    this.logger.log(
                        `Notification processed: ${routingKey}`,
                    );

                    channel.ack(
                        message,
                    );

                } catch (
                    error
                ) {

                    this.logger.error(
                        'Failed to process notification event',
                        error instanceof Error
                            ? error.stack
                            : undefined,
                    );

                    channel.nack(
                        message,
                        false,
                        false,
                    );
                }
            },
        );
    }
}