import {
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

@Injectable()
export class RfqService {
    constructor(
        private readonly repository:
            RfqRepository,

        private readonly rfqItemService:
            RfqItemService,

        private readonly eventsService:
            EventsService,
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

                    quantity:
                        Number(
                            item.quantity,
                        ),

                    targetPrice:
                        item.targetPrice
                            ? Number(
                                item.targetPrice,
                            )
                            : null,
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

    publish(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status:
                    RfqStatus.PUBLISHED,
            },
        );
    }

    close(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status:
                    RfqStatus.CLOSED,
            },
        );
    }

    cancel(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status:
                    RfqStatus.CANCELLED,
            },
        );
    }

    private generateRfqNumber() {
        return `RFQ-${new Date().getFullYear()}-${Date.now()}`;
    }
}