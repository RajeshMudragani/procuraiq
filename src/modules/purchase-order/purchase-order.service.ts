import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PurchaseOrderStatus } from '@prisma/client';
import { PurchaseOrderRepository } from './purchase-order.repository';
import { PurchaseOrderItemService } from '../purchase-order-item/purchase-order-item.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';

@Injectable()
export class PurchaseOrderService {

    constructor(
        private readonly repository: PurchaseOrderRepository,
        private readonly itemService: PurchaseOrderItemService,
    ) {}

    async create(
        dto: CreatePurchaseOrderDto,
    ) {

        const po = await this.repository.create({
                awardId: dto.awardId,
                supplierId: dto.supplierId,
                currency: dto.currency,
                issuedBy: dto.issuedBy,
                poNumber: `PO-${Date.now()}`,
            });

        await this.itemService.createMany(
            po.id,
            dto.items,
        );

        const totalAmount = dto.items.reduce(
            (
                total,
                item,
            ) =>
                total +
                (
                    item.quantity *
                    item.unitPrice
                ),
            0,
        );

        await this.repository.update(
            po.id,
            {
                totalAmount,
            },
        );

        return this.findById(
            po.id,
        );
    }

    async findById(
        id: string,
    ) {

        const po = await this.repository.findById(
            id,
        );

        if (!po) {
            throw new NotFoundException(
                'Purchase Order not found',
            );
        }

        const items = await this.itemService.findByPurchaseOrder(
            id,
        );

        const totalAmount = items.reduce(
            (
                total,
                item,
            ) =>
                total +
                (
                    Number(item.quantity) *
                    Number(item.unitPrice)
                ),
            0,
        );

        return {
            ...po,
            totalAmount,

            items: items.map(
                item => ({
                    ...item,
                    quantity: Number(item.quantity),
                    unitPrice: Number(item.unitPrice),
                    totalAmount: Number(item.totalAmount),
                }),
            ),
        };
    }

    findAll() {
        return this.repository.findAll();
    }

    issue(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status: PurchaseOrderStatus.ISSUED,
                issuedAt: new Date(),
            },
        );
    }

    approve(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status: PurchaseOrderStatus.APPROVED,
            },
        );
    }

    close(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status: PurchaseOrderStatus.CLOSED,
            },
        );
    }
}