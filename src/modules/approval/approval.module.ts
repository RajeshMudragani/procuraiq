import {
    Module,
    forwardRef,
} from '@nestjs/common';

import { ApprovalController } from './approval.controller';
import { ApprovalRepository } from './approval.repository';
import { ApprovalService } from './approval.service';
import { AwardModule } from '../award/award.module';
import { PurchaseOrderModule } from '../purchase-order/purchase-order.module';
import { ApprovalRegistryService } from './approval-registry.service';
import { AwardApprovalHandler } from './handlers/award-approval.handler';
import { PurchaseOrderApprovalHandler } from './handlers/purchase-order-approval.handler';
import { ApprovalSubmissionService } from './approval-submission.service';

@Module({
    imports: [
        forwardRef(() => AwardModule),
        forwardRef(() => PurchaseOrderModule),
    ],

    controllers: [
        ApprovalController,
    ],

    providers: [
        ApprovalRepository,

        ApprovalService,
        ApprovalSubmissionService,

        ApprovalRegistryService,

        AwardApprovalHandler,
        PurchaseOrderApprovalHandler,
    ],

    exports: [
        ApprovalRepository,
        ApprovalService,
        ApprovalSubmissionService,
    ],
})
export class ApprovalModule {}