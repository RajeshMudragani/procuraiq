import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AwardRepository {

    constructor(
        private readonly prisma:
            PrismaService,
    ) {}

    create(
        data: any,
    ) {
        return this.prisma.award.create({
            data,
        });
    }

    findAll() {
        return this.prisma.award.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.award.findUnique({
            where: {
                id,
            },
        });
    }

    update(
        id: string,
        data: any,
    ) {
        return this.prisma.award.update({
            where: {
                id,
            },
            data,
        });
    }
}