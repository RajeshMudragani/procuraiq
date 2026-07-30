import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';

import * as amqp from 'amqplib';

@Injectable()
export class RabbitMqService
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger =
        new Logger(
            RabbitMqService.name,
        );

    private connection!: amqp.ChannelModel;
    private channel!: amqp.Channel;
    private readonly exchange = process.env.RABBITMQ_EXCHANGE ?? 'procuraiq.events';

    async onModuleInit() {
        this.logger.log(
            'Connecting to RabbitMQ...',
        );

        this.connection = await amqp.connect(
            process.env.RABBITMQ_URL ??
            'amqp://guest:guest@localhost:5672',
        );

        this.logger.log(
            'RabbitMQ connection established',
        );

        this.channel =
            await this.connection.createChannel();

        this.logger.log(
            'RabbitMQ channel created',
        );

        await this.channel.assertExchange(
            this.exchange,
            'topic',
            {
                durable: true,
            },
        );

        this.logger.log(
            'RabbitMQ connected',
        );
    }

    async onModuleDestroy() {
        if (this.channel) {
            await this.channel.close();
        }

        if (this.connection) {
            await this.connection.close();
        }

        this.logger.log(
            'RabbitMQ disconnected',
        );
    }

    getChannel(): amqp.Channel {
        if (!this.channel) {
            throw new Error(
                'RabbitMQ channel not initialized',
            );
        }

        return this.channel;
    }

    getExchange(): string {
        return this.exchange;
    }

    async assertQueue(
        queueName: string,
    ) {
        await this.channel.assertQueue(
            queueName,
            {
                durable: true,
            },
        );
    }

    async bindQueue(
        queueName: string,
        routingKey: string,
    ) {
        await this.channel.bindQueue(
            queueName,
            this.exchange,
            routingKey,
        );
    }

    async consume(
        queueName: string,
        handler: (
            payload: unknown,
        ) => Promise<void>,
    ) {
        await this.channel.consume(
            queueName,

            async (msg) => {
                if (!msg) {
                    return;
                }

                try {
                    const payload = JSON.parse(
                        msg.content.toString(),
                    );

                    await handler(
                        payload,
                    );

                    this.channel.ack(
                        msg,
                    );
                } catch (error) {
                    this.logger.error(
                        error,
                    );

                    this.channel.nack(
                        msg,
                        false,
                        true,
                    );
                }
            },
        );
    }
}
