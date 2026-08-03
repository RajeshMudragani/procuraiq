import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';

import { RabbitMqService } from './rabbitmq.service';
import { EventPublisher } from './publishers/event.publisher';
import { EventsService } from './events.service';
import { AuditHandler } from './handlers/audit.handler';
import { AuditConsumer } from './consumers/audit.consumer';
import { NotificationHandler } from './handlers/notification.handler';
import { NotificationConsumer } from './consumers/notification.consumer';
import { EventTestController } from './test-event.controller';
import { NotificationModule } from '../../modules/notification/notification.module';
@Module({
    imports: [
        AuditModule,
        NotificationModule,
    ],

    providers: [
        RabbitMqService,
        EventPublisher,
        EventsService,

        // AuditHandler,
        // AuditConsumer,

        NotificationConsumer,
        NotificationHandler,
    ],

    exports: [
        RabbitMqService,
        EventPublisher,
        EventsService,
    ],

    controllers: [
        EventTestController,
    ]
})
export class EventsModule {}