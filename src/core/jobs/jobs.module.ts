import { Module } from '@nestjs/common';
import { JobProducer } from './producers/job.producer';
import { JobsService } from './jobs.service';

@Module({
    providers: [
        JobProducer,
        JobsService,
    ],

    exports: [
        JobProducer,
        JobsService,
    ]
})
export class JobsModule {}