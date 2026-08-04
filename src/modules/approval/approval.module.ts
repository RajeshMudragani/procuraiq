import {
    Module,
    forwardRef,
} from '@nestjs/common';

import { ApprovalController } from './approval.controller';
import { ApprovalRepository } from './approval.repository';
import { ApprovalService } from './approval.service';
import { AwardModule } from '../award/award.module';

@Module({
    imports: [
        forwardRef(
            () => AwardModule,
        ),
    ],

    controllers: [
        ApprovalController,
    ],

    providers: [
        ApprovalRepository,
        ApprovalService,
    ],

    exports: [
        ApprovalRepository,
        ApprovalService,
    ],
})
export class ApprovalModule {}