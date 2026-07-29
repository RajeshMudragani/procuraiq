import { Injectable } from '@nestjs/common';

import { QueueFactory } from '../queues/queue.factory';

import { QueueNames } from '../queues/queue-names';

@Injectable()
export class JobProducer {
    private readonly outboxQueue =
        QueueFactory.create(
            QueueNames.OUTBOX,
        );

    async enqueueOutbox(
        outboxEventId: string,
    ): Promise<void> {
        await this.outboxQueue.add(
            'publish-event',
            {
                outboxEventId,
            },
        );
    }
}