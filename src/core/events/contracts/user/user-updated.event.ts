import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class UserUpdatedEvent extends BaseEvent {
    eventType = EventTypes.USER_UPDATED;

    userId!: string;

    changes!: Record<string, unknown>;
}