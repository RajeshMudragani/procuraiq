import { Injectable } from '@nestjs/common';

import { JobProducer } from './producers/job.producer';

@Injectable()
export class JobsService {
    constructor(
        private readonly producer: JobProducer,
    ) {}

    async enqueueOutboxEvent(
        eventId: string,
    ): Promise<void> {
        await this.producer.enqueueOutbox(
            eventId,
        );
    }
}