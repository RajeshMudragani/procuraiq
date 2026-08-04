import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class QuotationRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: any,
    ) {
        return this.prisma.quotation.create({
            data,
        });
    }

    findAll() {
        return this.prisma.quotation.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.quotation.findUnique({
            where: {
                id,
            },
        });
    }

    update(
        id: string,
        data: any,
    ) {
        return this.prisma.quotation.update({
            where: {
                id,
            },
            data,
        });
    }
}