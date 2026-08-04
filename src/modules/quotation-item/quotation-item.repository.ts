import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class QuotationItemRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    createMany(
        data: any[],
    ) {
        return this.prisma.quotationItem.createMany({
            data,
        });
    }

    findByQuotation(
        quotationId: string,
    ) {
        return this.prisma.quotationItem.findMany({
            where: {
                quotationId,
            },
        });
    }
}