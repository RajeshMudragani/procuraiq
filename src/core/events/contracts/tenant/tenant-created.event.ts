import { BaseEvent } from '../../base-event';
import { EventTypes } from '../common/event-types';

export class TenantCreatedEvent extends BaseEvent {
    eventType = EventTypes.TENANT_CREATED;

    name!: string;

    code!: string;
}