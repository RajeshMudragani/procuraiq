import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { RabbitMqService } from '../rabbitmq.service';

@Injectable()
export class EventPublisher {
    private readonly logger =
        new Logger(
            EventPublisher.name,
        );

    constructor(
        private readonly rabbitMqService: RabbitMqService,
    ) {}

    async publish(
        routingKey: string,
        payload: unknown,
    ): Promise<void> {
        const channel = this.rabbitMqService.getChannel();

        console.log(
            'PUBLISHING:',
            JSON.stringify(
                payload,
                null,
                2,
            ),
        );


        console.log(
            'PUBLISHING EVENT:',
            routingKey,
            payload,
        );

        channel.publish(
            this.rabbitMqService.getExchange(),
            routingKey,
            Buffer.from(
                JSON.stringify(payload),
            ),
            {
                persistent: true,
                contentType:
                'application/json',
            },
        );

        this.logger.debug(
            `Event published: ${routingKey}`,
        );
    }
}