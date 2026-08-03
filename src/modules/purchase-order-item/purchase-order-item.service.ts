import { Injectable } from '@nestjs/common';
import { PurchaseOrderItemRepository } from './purchase-order-item.repository';

@Injectable()
export class PurchaseOrderItemService {

    constructor(
        private readonly repository: PurchaseOrderItemRepository,
    ) {}

    createMany(
        purchaseOrderId: string,
        items: any[],
    ) {

        return this.repository.createMany(
            items.map(
                item => ({
                    purchaseOrderId,
                    ...item,
                    totalAmount: item.quantity * item.unitPrice,
                }),
            ),
        );
    }

    findByPurchaseOrder(
        purchaseOrderId: string,
    ) {
        return this.repository.findByPurchaseOrder(
            purchaseOrderId,
        );
    }
}