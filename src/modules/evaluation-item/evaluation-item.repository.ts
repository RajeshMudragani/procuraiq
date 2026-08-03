import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class EvaluationItemRepository {

    constructor(
        private readonly prisma:
            PrismaService,
    ) {}

    createMany(
        data: any[],
    ) {
        return this.prisma.evaluationItem.createMany({
            data,
        });
    }

    findByEvaluation(
        evaluationId: string,
    ) {
        return this.prisma.evaluationItem.findMany({
            where: {
                evaluationId,
            },
        });
    }
}