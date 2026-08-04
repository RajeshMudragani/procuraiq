import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { RfqStatus } from '@prisma/client';
import { CreateRfqDto } from './dto/create-rfq.dto';
import { UpdateRfqDto } from './dto/update-rfq.dto';
import { RfqRepository } from './rfq.repository';
import { RfqItemService } from '../rfq-item/rfq-item.service';
import { EventsService } from '../../core/events/events.service';
import { RoutingKeys } from '../../core/events/contracts/common/routing-keys';
import { RfqResponseDto } from './dto/rfq-response.dto';
import { ApprovalService } from '../approval/approval.service';
import { SubmitRfqForApprovalDto } from './dto/submit-rfq-for-approval.dto';
import { ApprovalRepository } from '../approval/approval.repository';
import { ApprovalEntityType } from '@prisma/client';

@Injectable()
export class RfqService {
    constructor(
        private readonly repository: RfqRepository,
        private readonly rfqItemService: RfqItemService,
        private readonly approvalService: ApprovalService,
        private readonly approvalRepository: ApprovalRepository,
        private readonly eventsService: EventsService,
    ) {}

    async create(
        dto: CreateRfqDto,
    ) {

        const rfq =
            await this.repository.create({
                tenantId: dto.tenantId,
                rfqNumber: this.generateRfqNumber(),
                title: dto.title,
                description: dto.description,
                currency: dto.currency,
                submissionDeadline: new Date(dto.submissionDeadline),
                status: RfqStatus.DRAFT,
                createdBy: dto.createdBy,
            });

        await this.rfqItemService.createMany(
            rfq.id,
            dto.items,
        );

        await this.eventsService.publish(
            RoutingKeys.RFQ_CREATED,
            {
                eventType: RoutingKeys.RFQ_CREATED,
                tenantId: rfq.tenantId,
                rfqId: rfq.id,
                rfqNumber: rfq.rfqNumber,
                createdBy: rfq.createdBy,
            },
        );

        return this.findById(
            rfq.id,
        );
    }

    async findById(
        id: string,
    ) {
        const rfq = await this.repository.findById(
            id,
        );

        if (!rfq) {
            throw new NotFoundException(
                'RFQ not found',
            );
        }

        const items = await this.rfqItemService.findByRfq(
            id,
        );

        const response: RfqResponseDto = {
            ...rfq,
            items: items.map(
                item => ({
                    ...item,

                    quantity: Number(item.quantity),
                    targetPrice: item.targetPrice ? Number(item.targetPrice) : null,
                }),
            ),
        };

        return response;
    }

    findAll() {
        return this.repository.findAll();
    }

    update(
        id: string,
        dto: UpdateRfqDto,
    ) {
        return this.repository.update(
            id,
            dto,
        );
    }

    async publish(
        id: string,
    ) {

        const rfq = await this.repository.findById(
            id,
        );

        if (!rfq) {
            throw new NotFoundException(
                'RFQ not found',
            );
        }

        if (
            rfq.status !==
            RfqStatus.PENDING_APPROVAL
        ) {
            throw new BadRequestException(
                'RFQ must be pending approval',
            );
        }

        const approval = await this.approvalRepository.findApprovedByEntity(
            'RFQ',
            rfq.id,
        );

        if (!approval) {
            throw new BadRequestException(
                'RFQ approval not completed',
            );
        }

        return this.repository.update(
            id,
            {
                status: RfqStatus.PUBLISHED,
            },
        );
    }

    close(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status: RfqStatus.CLOSED,
            },
        );
    }

    cancel(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status: RfqStatus.CANCELLED,
            },
        );
    }

    private generateRfqNumber() {
        return `RFQ-${new Date().getFullYear()}-${Date.now()}`;
    }

    async submitForApproval(
        id: string,
        dto: SubmitRfqForApprovalDto,
    ) {

        const rfq = await this.repository.findById(
            id,
        );

        if (!rfq) {
            throw new NotFoundException(
                'RFQ not found',
            );
        }

        if (
            rfq.status !==
            RfqStatus.DRAFT
        ) {
            throw new BadRequestException(
                'Only draft RFQs can be submitted for approval',
            );
        }

        const approval = await this.approvalService.create({
            entityType: ApprovalEntityType.RFQ,
            entityId: rfq.id,
            requestedBy: dto.requestedBy,
            steps: dto.steps,
        });

        await this.repository.update(
            id,
            {
                status: RfqStatus.PENDING_APPROVAL,
            },
        );

        return {
            rfqId: rfq.id,
            approvalId: approval.id,
            status: 'PENDING_APPROVAL',
        };
    }
}