import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class PermissionAssignedEvent extends BaseEvent {
    eventType = EventTypes.PERMISSION_ASSIGNED;

    roleId!: string;

    permissionId!: string;

    permissionCode!: string;
}