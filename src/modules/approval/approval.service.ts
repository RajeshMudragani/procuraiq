import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import {
    ApprovalStatus,
    AuditAction,
} from '@prisma/client';

import { ApprovalRepository } from './approval.repository';
import { ApproveDto } from './dto/approve.dto';
import { RejectDto } from './dto/reject.dto';
import { ApprovalRegistryService } from './approval-registry.service';
import { AuditService } from '../../core/audit/audit.service';

@Injectable()
export class ApprovalService {
    constructor(
        private readonly repository: ApprovalRepository,
        private readonly registry: ApprovalRegistryService,
        private readonly auditService: AuditService,
    ) {}

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

        const handler = this.registry.getHandler(
            approval.entityType,
        );

        await handler.markApproved(
            approval.entityId,
        );
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
        } else {
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

        const updatedApproval = await this.findById(id);

        await this.auditService.log({
            action: AuditAction.APPROVE,
            entityType: 'Approval',
            entityId: id,
            userId: dto.approverId,
            tenantId: approval.id,
            oldData: {
                status: approval.status,
                currentStep: approval.currentStep,
            },
            newData: {
                status: updatedApproval.status,
                currentStep: updatedApproval.currentStep,
            },
            metadata: {
                approverId: dto.approverId,
                stepNumber: currentStep.stepNumber,
                comments: dto.comments,
            },
        });

        return updatedApproval;
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

        const updatedApproval = await this.findById(id);

        await this.auditService.log({
            action:  AuditAction.REJECT,
            entityType: 'Approval',
            entityId: id,
            userId: dto.approverId,
            tenantId: approval.id,
            oldData: {
                status: approval.status,
                currentStep: approval.currentStep,
            },
            newData: {
                status: updatedApproval.status,
                currentStep: updatedApproval.currentStep,
            },
            metadata: {
                approverId: dto.approverId,
                stepNumber: currentStep.stepNumber,
                comments: dto.comments,
            },
        });

        return updatedApproval;
    }
}