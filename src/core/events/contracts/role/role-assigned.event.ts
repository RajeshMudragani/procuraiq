import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class RoleAssignedEvent extends BaseEvent {
    eventType = EventTypes.ROLE_ASSIGNED;

    userId!: string;

    roleId!: string;

    roleName!: string;
}