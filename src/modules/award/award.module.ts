import { Module, forwardRef } from '@nestjs/common';
import { AwardItemModule } from '../award-item/award-item.module';
import { AwardController } from './award.controller';
import { AwardRepository } from './award.repository';
import { AwardService } from './award.service';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { ApprovalModule } from '../approval/approval.module';

@Module({
    imports: [
        AwardItemModule,
        forwardRef(() => EvaluationModule),
        forwardRef(() => ApprovalModule),
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
