import { Injectable } from '@nestjs/common';

import { OutboxRepository } from './outbox.repository';

@Injectable()
export class OutboxService {
    constructor(
        private readonly repository: OutboxRepository,
    ) {}

    async createMessage(
        eventType: string,
        aggregateType: string,
        aggregateId: string,
        payload: unknown,
    ) {
        return this.repository.create({
            eventType,
            aggregateType,
            aggregateId,
            payload: payload as object,
            processed: false,
        });
    }

    async findById(
        id: string,
    ) {
        return this.repository.findById(
            id,
        );
    }

    async markProcessed(
        id: string,
    ) {
        return this.repository.update(id, {
            processed: true,
            processedAt: new Date(),
        });
    }
}