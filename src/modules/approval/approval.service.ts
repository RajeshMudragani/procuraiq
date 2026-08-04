import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { ApprovalEntityType, ApprovalStatus } from '@prisma/client';
import { ApprovalRepository } from './approval.repository';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { ApproveDto } from './dto/approve.dto';
import { RejectDto } from './dto/reject.dto';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';
import { AwardService } from '../award/award.service';

@Injectable()
export class ApprovalService {

    constructor(
        private readonly repository: ApprovalRepository,
        private readonly awardService: AwardService,
        private readonly purchaseOrderService: PurchaseOrderService,
    ) {}

    async create(
        dto: CreateApprovalDto,
    ) {

        const sortedSteps = [...dto.steps].sort(
            ( a, b ) => a.stepNumber - b.stepNumber,
        );

        sortedSteps.forEach(
            (
                step,
                index,
            ) => {

                if ( step.stepNumber !== index + 1 ) {
                    throw new BadRequestException(
                        'Step numbers must be sequential starting from 1',
                    );
                }
            },
        );

        const approvers = dto.steps.map(
            step => step.approverId,
        );

        if (
            new Set(
                approvers,
            ).size !==
            approvers.length
        ) {
            throw new BadRequestException(
                'Duplicate approvers are not allowed',
            );
        }

        const approval = await this.repository.create({
                entityType: dto.entityType,
                entityId: dto.entityId,
                requestedBy: dto.requestedBy,
            });

        await this.repository.createSteps(
            dto.steps.map(
                step => ({
                    approvalId: approval.id,
                    stepNumber: step.stepNumber,
                    approverId: step.approverId,
                }),
            ),
        );

        return this.findById(
            approval.id,
        );
    }

    async findById(
        id: string,
    ) {

        const approval = await this.repository.findById(
            id,
        );

        if (!approval) {
            throw new NotFoundException(
                'Approval not found',
            );
        }

        return approval;
    }

    private async updateEntityStatus(
        approval: any,
    ) {

        switch (
            approval.entityType
        ) {

            case ApprovalEntityType.AWARD:

                await this.awardService.markApproved(
                    approval.entityId,
                );

                break;

            case ApprovalEntityType.PURCHASE_ORDER:

                await this.purchaseOrderService.markApproved(
                    approval.entityId,
                );

                break;

            default:
                break;
        }
    }

    async approve(
        id: string,
        dto: ApproveDto,
    ) {
        const approval = await this.findById(id);

        if (
            approval.status !==
            ApprovalStatus.PENDING
        ) {
            throw new BadRequestException(
                'Approval already completed',
            );
        }

        const currentStep = approval.steps.find(
            step =>
                step.stepNumber ===
                approval.currentStep,
        );

        if (!currentStep) {
            throw new NotFoundException(
                'Approval step not found',
            );
        }

        if (
            currentStep.status !==
            ApprovalStatus.PENDING
        ) {
            throw new BadRequestException(
                'Approval step already processed',
            );
        }

        if (
            currentStep.approverId !==
            dto.approverId
        ) {
            throw new BadRequestException(
                'Invalid approver',
            );
        }

        await this.repository.updateStep(
            currentStep.id,
            {
                status:
                    ApprovalStatus.APPROVED,
                comments:
                    dto.comments,
                actionAt:
                    new Date(),
            },
        );

        const nextStep = approval.steps.find(
            step =>
                step.stepNumber ===
                approval.currentStep + 1,
        );

        if (nextStep) {

            await this.repository.update(
                id,
                {
                    currentStep:
                        approval.currentStep + 1,
                },
            );
        }
        else {

            await this.repository.update(
                id,
                {
                    status:
                        ApprovalStatus.APPROVED,
                },
            );

            await this.updateEntityStatus(
                approval,
            );
        }

        return this.findById(id);
    }

    async reject(
        id: string,
        dto: RejectDto,
    ) {

        const approval = await this.findById(
            id,
        );

        if (
            approval.status !==
            ApprovalStatus.PENDING
        ) {
            throw new BadRequestException(
                'Approval already completed',
            );
        }

        const currentStep = approval.steps.find(step =>
            step.stepNumber === approval.currentStep,
        );

        if (!currentStep) {
            throw new NotFoundException(
                'Approval step not found',
            );
        }

        if (
            currentStep.status !==
            ApprovalStatus.PENDING
        ) {
            throw new BadRequestException(
                'Approval step already processed',
            );
        }

        if (
            currentStep.approverId !==
            dto.approverId
        ) {
            throw new BadRequestException(
                'Invalid approver',
            );
        }

        await this.repository.updateStep(
            currentStep.id,
            {
                status: ApprovalStatus.REJECTED,
                comments: dto.comments,
                actionAt: new Date(),
            },
        );

        await this.repository.update(
            id,
            {
                status: ApprovalStatus.REJECTED,
            },
        );

        return this.findById(
            id,
        );
    }
}
