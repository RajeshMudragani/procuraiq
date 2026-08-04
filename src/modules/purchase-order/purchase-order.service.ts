import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PurchaseOrderRepository } from './purchase-order.repository';
import { PurchaseOrderItemService } from '../purchase-order-item/purchase-order-item.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { ApprovalEntityType, AwardStatus, PurchaseOrderStatus } from '@prisma/client';
import { AwardRepository } from '../award/award.repository';
import { SubmitPoForApprovalDto } from './dto/submit-po-for-approval.dto';
import {
    Inject,
    forwardRef,
} from '@nestjs/common';

import { ApprovalService }
from '../approval/approval.service';

@Injectable()
export class PurchaseOrderService {

    constructor(
        private readonly repository: PurchaseOrderRepository,
        private readonly itemService: PurchaseOrderItemService,
        private readonly awardRepository: AwardRepository,

        @Inject(
            forwardRef(
                () => ApprovalService,
            ),
        )
        private readonly approvalService: ApprovalService,
    ) {}

    async create(
        dto: CreatePurchaseOrderDto,
    ) {

        const award = await this.awardRepository.findById(
            dto.awardId,
        );

        if (!award) {
            throw new NotFoundException(
                'Award not found',
            );
        }

        if (
            award.status !==
            AwardStatus.AWARDED
        ) {
            throw new BadRequestException(
                'Award must be awarded before creating a purchase order',
            );
        }
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

        console.log(
            'PO Total Amount:', totalAmount,
        );
        await this.repository.update(
            po.id,
            {
                totalAmount,
            },
        );

        return await this.findById(
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

    async issue(
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

        if (
            po.status !==
            PurchaseOrderStatus.APPROVED
        ) {
            throw new BadRequestException(
                'Purchase order approval not completed',
            );
        }

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
                status: PurchaseOrderStatus.CANCELLED,
            },
        );
    }

    async submitForApproval(
        id: string,
        dto: SubmitPoForApprovalDto,
    ) {

        const po = await this.findById(id);

        if (
            po.status !==
            PurchaseOrderStatus.DRAFT
        ) {
            throw new BadRequestException(
                'Only draft purchase orders can be submitted for approval',
            );
        }

        const approval = await this.approvalService.create({
                entityType: ApprovalEntityType.PURCHASE_ORDER,
                entityId: po.id,
                requestedBy: dto.requestedBy,
                steps: dto.steps,
            });

        await this.repository.update(
            id,
            {
                status: PurchaseOrderStatus.PENDING_APPROVAL,
            },
        );

        return {
            poId: po.id,
            approvalId: approval.id,
            status: 'PENDING_APPROVAL',
        };
    }

    async markApproved(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status: PurchaseOrderStatus.APPROVED,
            },
        );
    }
}