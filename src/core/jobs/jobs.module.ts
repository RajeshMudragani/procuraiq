import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobProducer } from './producers/job.producer';
import { OutboxModule } from '../outbox/outbox.module';
import { EventsModule } from '../events/events.module';
import { OutboxProcessor } from './processors/outbox.processor';

@Module({
    imports: [
        OutboxModule,
        EventsModule,
    ],

    providers: [
        JobsService,
        JobProducer,
        OutboxProcessor,
    ],

    exports: [
        JobsService,
        OutboxProcessor,
  ],
})
export class JobsModule {}