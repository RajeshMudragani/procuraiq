import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { ApprovalEntityType, ApprovalStatus } from '@prisma/client';
import { RfqService } from '../rfq/rfq.service';

@Injectable()
export class ApprovalRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: any,
    ) {
        return this.prisma.approval.create({
            data,
        });
    }

    async findAll(
        status?: ApprovalStatus,
    ) {
        return this.prisma.approval.findMany({
            where: status
                ? {
                    status,
                }
                : undefined,

            include: {
                steps: true,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.approval.findUnique({
            where: {
                id,
            },

            include: {
                steps: true,
            },
        });
    }

    update(
        id: string,
        data: any,
    ) {
        return this.prisma.approval.update({
            where: {
                id,
            },

            data,
        });
    }

    createSteps(
        data: any[],
    ) {
        return this.prisma.approvalStep.createMany({
            data,
        });
    }

    updateStep(
        id: string,
        data: any,
    ) {
        return this.prisma.approvalStep.update({
            where: {
                id,
            },

            data,
        });
    }

    findApprovedByEntity(
        entityType: ApprovalEntityType,
        entityId: string,
    ) {
        return this.prisma.approval.findFirst({
            where: {
                entityType,
                entityId,
                status: ApprovalStatus.APPROVED,
            },
        });
    }
}