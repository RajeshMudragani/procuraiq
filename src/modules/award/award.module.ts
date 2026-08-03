import { Module } from '@nestjs/common';
import { AwardItemModule } from '../award-item/award-item.module';
import { AwardController } from './award.controller';
import { AwardRepository } from './award.repository';
import { AwardService } from './award.service';
import { EvaluationModule } from '../evaluation/evaluation.module';

@Module({
    imports: [
        AwardItemModule,
        EvaluationModule,
    ],

    controllers: [
        AwardController,
    ],

    providers: [
        AwardRepository,
        AwardService,
    ],

    exports: [
        AwardRepository,
        AwardService,
    ],
})
export class AwardModule {}
