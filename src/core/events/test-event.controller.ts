import {
    Controller,
    Post,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { RoutingKeys } from './contracts/common/routing-keys';

@Controller('event-test')
export class EventTestController {
    constructor(
        private readonly eventsService:
            EventsService,
    ) {}

    @Post('user-created')
    async publishUserCreatedEvent() {
        await this.eventsService.publish(
            'user.created',
            {
                eventType: RoutingKeys.USER_CREATED,

                tenantId: 'tenant-001',

                userId: 'user-001',

                triggeredBy: 'system',

                email: 'test@procuraiq.com',
            },
        );

        return {
            success: true,
            message:
                'user.created event published',
        };
    }
}