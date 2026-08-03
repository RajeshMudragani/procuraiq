import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ApprovalStatus } from '@prisma/client';
import { ApprovalRepository } from './approval.repository';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { ApproveDto } from './dto/approve.dto';
import { RejectDto } from './dto/reject.dto';

@Injectable()
export class ApprovalService {

    constructor(
        private readonly repository:
            ApprovalRepository,
    ) {}

    async create(
        dto: CreateApprovalDto,
    ) {

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

    async approve(
        id: string,
        dto: ApproveDto,
    ) {
        const approval = await this.findById(id);

        const currentStep = approval.steps.find(
            step => step.stepNumber === approval.currentStep,
        );

        if (!currentStep) {
            throw new NotFoundException(
                'Approval step not found',
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
                status: ApprovalStatus.APPROVED,
                comments: dto.comments,
                actionAt: new Date(),
            },
        );

        const nextStep = approval.steps.find(
            step => step.stepNumber === approval.currentStep + 1,
        );

        if (nextStep) {

            await this.repository.update(
                id,
                {
                    currentStep: approval.currentStep + 1,
                },
            );
        }
        else {

            await this.repository.update(
                id,
                {
                    status: ApprovalStatus.APPROVED,
                },
            );
        }

        return this.findById(
            id,
        );
    }

    async reject(
        id: string,
        dto: RejectDto,
    ) {

        const approval = await this.findById(
            id,
        );

        const currentStep = approval.steps.find(step =>
            step.stepNumber === approval.currentStep,
        );

        if (!currentStep) {
            throw new NotFoundException(
                'Approval step not found',
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
