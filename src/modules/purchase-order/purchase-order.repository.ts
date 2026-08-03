import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class PurchaseOrderRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: any,
    ) {
        return this.prisma.purchaseOrder.create({
            data,
        });
    }

    findAll() {
        return this.prisma.purchaseOrder.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.purchaseOrder.findUnique({
            where: {
                id,
            },
        });
    }

    update(
        id: string,
        data: any,
    ) {
        return this.prisma.purchaseOrder.update({
            where: {
                id,
            },
            data,
        });
    }
}