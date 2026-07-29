import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class RoleRemovedEvent extends BaseEvent {
    eventType = EventTypes.ROLE_REMOVED;

    userId!: string;

    roleId!: string;
}