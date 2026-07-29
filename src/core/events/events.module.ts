import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq.service';
import { EventPublisher } from './publishers/event.publisher';
import { EventsService } from './events.service';
import { NotificationConsumer } from './consumers/notification.consumer';
import { AuditConsumer } from './consumers/audit.consumer';

@Module({
    providers: [
        RabbitMqService,
        EventPublisher,
        EventsService,
    ],

    exports: [
        RabbitMqService,
        EventPublisher,
        EventsService,
    ],
})
export class EventsModule {}