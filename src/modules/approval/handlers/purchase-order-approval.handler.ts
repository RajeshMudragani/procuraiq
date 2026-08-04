import { Injectable } from '@nestjs/common';
import { ApprovalEntityType } from '@prisma/client';
import { PurchaseOrderService } from '../../purchase-order/purchase-order.service';
import { ApprovalEntityHandler } from './approval-entity-handler.interface';

@Injectable()
export class PurchaseOrderApprovalHandler
implements ApprovalEntityHandler {

    readonly entityType = ApprovalEntityType.PURCHASE_ORDER;

    constructor(
        private readonly purchaseOrderService:
            PurchaseOrderService,
    ) {}

    async markApproved(
        entityId: string,
    ): Promise<void> {

        await this.purchaseOrderService.markApproved(
            entityId,
        );
    }
}