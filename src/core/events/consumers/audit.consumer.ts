import {
    Injectable,
    Logger,
    OnApplicationBootstrap,
} from '@nestjs/common';

import { RabbitMqService } from '../rabbitmq.service';
import { QueueNames } from '../contracts/common/queue-names';
import { AuditHandler } from '../handlers/audit.handler';

@Injectable()
export class AuditConsumer
    implements OnApplicationBootstrap
{
    private readonly logger =
        new Logger(
            AuditConsumer.name,
        );

    constructor(
        private readonly rabbitMqService: RabbitMqService,
        private readonly auditHandler: AuditHandler,
    ) {}

    async onApplicationBootstrap() {
        this.logger.log(
            'Starting Audit Consumer...',
        );

        await this.rabbitMqService.assertQueue(
            QueueNames.AUDIT,
        );

        await this.rabbitMqService.bindQueue(
            QueueNames.AUDIT,
            '#',
        );

        await this.rabbitMqService.consume(
            QueueNames.AUDIT,

            async (payload) => {
                this.logger.log(
                    'Audit event received',
                );

                await this.auditHandler.handle(
                    payload,
                );
            },
        );

        this.logger.log(
            'Audit consumer started',
        );
    }
}