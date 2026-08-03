import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class PurchaseOrderItemRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    createMany(
        data: any[],
    ) {
        return this.prisma.purchaseOrderItem.createMany({
            data,
        });
    }

    findByPurchaseOrder(
        purchaseOrderId: string,
    ) {
        return this.prisma.purchaseOrderItem.findMany({
            where: {
                purchaseOrderId,
            },
        });
    }
}