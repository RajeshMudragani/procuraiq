import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';

import { ApprovalRepository } from './approval.repository';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { AuditService } from '../../core/audit/audit.service';
import { NotificationService } from '../notification/notification.service';
import { AuditAction, Prisma } from '@prisma/client';
import { NotificationChannel } from '../notification/enums/notification-channel.enum';
import { NotificationType } from '../notification/enums/notification-type.enum';

@Injectable()
export class ApprovalSubmissionService {

    constructor(
        private readonly repository: ApprovalRepository,
        private readonly auditService: AuditService,
        private readonly notificationService: NotificationService,
    ) {}

    async create(
        dto: CreateApprovalDto,
    ): Promise<{ id: string }> {

        const sortedSteps = [...dto.steps].sort(
            (a, b) => a.stepNumber - b.stepNumber,
        );

        sortedSteps.forEach(
            (step, index) => {

                if (
                    step.stepNumber !==
                    index + 1
                ) {
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
            ).size !== approvers.length
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

        await this.auditService.log({
            action: AuditAction.CREATE,
            entityType: 'Approval',
            entityId: approval.id,
            userId: dto.requestedBy,
            newData: {
                entityType: dto.entityType,
                entityId: dto.entityId,
                requestedBy: dto.requestedBy,
                steps: dto.steps.map(step => ({
                    stepNumber: step.stepNumber,
                    approverId: step.approverId,
                })),
            } as Prisma.InputJsonValue,
        });

        await this.notificationService.createSystemNotification({
            tenantId: 'SYSTEM',
            userId: dto.steps[0].approverId,
            type: NotificationType.SYSTEM,
            channel: NotificationChannel.IN_APP,
            title: 'Approval Request Received',
            message: `Approval ${approval.id} requires your review`,
            metadata: {
                approvalId: approval.id,
                entityType: dto.entityType,
                entityId: dto.entityId,
                requestedBy: dto.requestedBy,
            },
        });

        return {
            id: approval.id,
        };
    }
}