import { Module } from '@nestjs/common';
import { PurchaseOrderItemModule } from '../purchase-order-item/purchase-order-item.module';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderRepository } from './purchase-order.repository';
import { PurchaseOrderService } from './purchase-order.service';

@Module({
    imports: [
        PurchaseOrderItemModule,
    ],

    controllers: [
        PurchaseOrderController,
    ],

    providers: [
        PurchaseOrderRepository,
        PurchaseOrderService,
    ],

    exports: [
        PurchaseOrderService,
    ],
})
export class PurchaseOrderModule {}