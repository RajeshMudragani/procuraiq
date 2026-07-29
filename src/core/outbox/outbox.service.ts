import { Injectable } from '@nestjs/common';

import { OutboxRepository } from './outbox.repository';

import { OutboxStatus } from './constants/outbox.constants';

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

    async getPendingMessages() {
        return this.repository.findPending();
    }
}