import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class UserDeletedEvent extends BaseEvent {
    eventType = EventTypes.USER_DELETED;

    userId!: string;
}