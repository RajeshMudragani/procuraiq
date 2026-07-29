import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class UserLoginEvent extends BaseEvent {
    eventType = EventTypes.USER_LOGIN;

    userId!: string;

    email!: string;

    ipAddress?: string;

    userAgent?: string;
}