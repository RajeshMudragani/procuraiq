import { Module } from '@nestjs/common';
import { PurchaseOrderItemRepository } from './purchase-order-item.repository';
import { PurchaseOrderItemService } from './purchase-order-item.service';

@Module({
    providers: [
        PurchaseOrderItemRepository,
        PurchaseOrderItemService,
    ],

    exports: [
        PurchaseOrderItemService,
    ],
})
export class PurchaseOrderItemModule {}