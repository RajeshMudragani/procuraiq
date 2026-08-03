import { Injectable } from '@nestjs/common';

import {
    AwardStatus,
    PurchaseOrderStatus,
    QuotationStatus,
    RfqStatus,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class DashboardRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async getSummary() {

        const [
            totalSuppliers,
            totalRfqs,
            publishedRfqs,
            totalQuotations,
            submittedQuotations,
            totalAwards,
            awardedAwards,
            totalPurchaseOrders,
            issuedPurchaseOrders,
            purchaseOrders,
        ] = await Promise.all([
            this.prisma.supplier.count(),

            this.prisma.rfq.count(),

            this.prisma.rfq.count({
                where: {
                    status: RfqStatus.PUBLISHED,
                },
            }),

            this.prisma.quotation.count(),

            this.prisma.quotation.count({
                where: {
                    status: QuotationStatus.SUBMITTED,
                },
            }),

            this.prisma.award.count(),

            this.prisma.award.count({
                where: {
                    status: AwardStatus.AWARDED,
                },
            }),

            this.prisma.purchaseOrder.count(),

            this.prisma.purchaseOrder.count({
                where: {
                    status: PurchaseOrderStatus.ISSUED,
                },
            }),

            this.prisma.purchaseOrder.findMany({
                select: {
                    totalAmount: true,
                },
            }),
        ]);

        const totalSpend = purchaseOrders.reduce(
            (
                total,
                po,
            ) =>
                total +
                Number(
                    po.totalAmount,
                ),
            0,
        );

        return {
            totalSuppliers,
            totalRfqs,
            publishedRfqs,
            totalQuotations,
            submittedQuotations,
            totalAwards,
            awardedAwards,
            totalPurchaseOrders,
            issuedPurchaseOrders,
            totalSpend,
        };
    }
}