import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';

import { RabbitMqService } from './rabbitmq.service';
import { EventPublisher } from './publishers/event.publisher';
import { EventsService } from './events.service';
import { AuditHandler } from './handlers/audit.handler';
import { AuditConsumer } from './consumers/audit.consumer';

@Module({
    imports: [
        AuditModule,
    ],

    providers: [
        RabbitMqService,
        EventPublisher,
        EventsService,

        AuditHandler,
        AuditConsumer,
    ],

    exports: [
        RabbitMqService,
        EventPublisher,
        EventsService,
    ],
})
export class EventsModule {}