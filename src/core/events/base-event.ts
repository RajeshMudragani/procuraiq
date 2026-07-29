export abstract class BaseEvent {
    eventId!: string;

    eventType!: string;

    occurredAt!: Date;

    tenantId?: string;

    triggeredBy?: string;

    correlationId?: string;

    causationId?: string;
}