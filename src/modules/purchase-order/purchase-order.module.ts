import {
    Module,
    forwardRef,
} from '@nestjs/common';

import { ApprovalModule } from '../approval/approval.module';
import { PurchaseOrderRepository } from './purchase-order.repository';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderItemModule } from '../purchase-order-item/purchase-order-item.module';
import { AwardModule } from '../award/award.module';
import { PurchaseOrderController } from './purchase-order.controller';

@Module({
    imports: [
        PurchaseOrderItemModule,
        forwardRef(() => ApprovalModule),
        forwardRef(() => AwardModule),
    ],

    controllers: [
        PurchaseOrderController,
    ],

    providers: [
        PurchaseOrderRepository,
        PurchaseOrderService,
    ],

    exports: [
        PurchaseOrderRepository,
        PurchaseOrderService,
    ],
})
export class PurchaseOrderModule {}