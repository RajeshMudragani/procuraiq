import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class EvaluationRepository {

    constructor(
        private readonly prisma:
            PrismaService,
    ) {}

    create(
        data: any,
    ) {
        return this.prisma.evaluation.create({
            data,
        });
    }

    findAll() {
        return this.prisma.evaluation.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.evaluation.findUnique({
            where: {
                id,
            },
        });
    }

    update(
        id: string,
        data: any,
    ) {
        return this.prisma.evaluation.update({
            where: {
                id,
            },
            data,
        });
    }
}