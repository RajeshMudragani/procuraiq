import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class UserLogoutEvent extends BaseEvent {
    eventType = EventTypes.USER_LOGOUT;

    userId!: string;
}