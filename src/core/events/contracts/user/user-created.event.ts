import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class UserCreatedEvent extends BaseEvent {
    eventType = EventTypes.USER_CREATED;

    userId!: string;

    email!: string;

    firstName!: string;

    lastName!: string;

    isActive!: boolean;
}
