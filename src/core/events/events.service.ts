import { Injectable } from '@nestjs/common';
import { EventPublisher } from './publishers/event.publisher';
import { RoutingKeys } from './contracts/common/routing-keys';
import { BaseEvent } from './base-event';

@Injectable()
export class EventsService {
    constructor(
        private readonly publisher: EventPublisher,
    ) {}

    async publish(
        routingKey: (typeof RoutingKeys)[keyof typeof RoutingKeys],
        payload: unknown,
    ): Promise<void>
    {
        await this.publisher.publish(
            routingKey,
            payload,
        );
    }
}