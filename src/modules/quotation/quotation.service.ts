import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { QuotationStatus, RfqStatus } from '@prisma/client';
import { QuotationRepository } from './quotation.repository';
import { QuotationItemService } from '../quotation-item/quotation-item.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { EventsService } from '../../core/events/events.service';
import { QuotationResponseDto } from './dto/quotation-response.dto';
import { RfqRepository } from '../rfq/rfq.repository';

@Injectable()
export class QuotationService {

    constructor(
        private readonly repository: QuotationRepository,
        private readonly quotationItemService: QuotationItemService,
        private readonly rfqRepository: RfqRepository,
    ) {}

    async create(
        dto: CreateQuotationDto,
    ) {

        const rfq = await this.rfqRepository.findById(
                dto.rfqId,
            );

        if (!rfq) {
            throw new NotFoundException(
                'RFQ not found',
            );
        }

        if (
            rfq.status !==
            RfqStatus.PUBLISHED
        ) {
            throw new BadRequestException(
                'RFQ must be published before accepting quotations',
            );
        }

        const quotation =
            await this.repository.create({
                rfqId: dto.rfqId,
                supplierId: dto.supplierId,
                quotationNumber: `QT-${Date.now()}`,
                status: QuotationStatus.DRAFT,
                remarks: dto.remarks,
            });

        await this.quotationItemService.createMany(
            quotation.id,
            dto.items,
        );

        const totalAmount = dto.items.reduce(
            (
                total,
                item,
            ) =>
                total +
                (
                    item.quantity *
                    item.unitPrice
                ),
            0,
        );

        await this.repository.update(
            quotation.id,
            {
                totalAmount,
            },
        );

        return this.findById(
            quotation.id,
        );
    }

    async findById(
        id: string,
    ): Promise<QuotationResponseDto> {

        const quotation = await this.repository.findById(
            id,
        );

        if (!quotation) {
            throw new NotFoundException(
                'Quotation not found',
            );
        }

        const items = await this.quotationItemService.findByQuotation(
            id,
        );

        const totalAmount = items.reduce(
            (
                total,
                item,
            ) =>
                total +
                (
                    Number(
                        item.unitPrice,
                    ) *
                    Number(
                        item.quantity,
                    )
                ),
            0,
        );

        return {
            ...quotation,
            totalAmount: Number(totalAmount),

            items: items.map(
                item => ({
                    id: item.id,
                    quotationId: item.quotationId,
                    rfqItemId: item.rfqItemId,
                    unitPrice: Number(item.unitPrice),
                    quantity: Number(item.quantity),
                    leadTimeDays: item.leadTimeDays,
                    remarks: item.remarks,
                    createdAt: item.createdAt,
                }),
            ),
        };
    }

    findAll() {
        return this.repository.findAll();
    }

    async submit(
        id: string,
    ) {

        await this.repository.update(
            id,
            {
                status: QuotationStatus.SUBMITTED,
                submittedAt: new Date(),
            },
        );

        return this.findById(
            id,
        );
    }
}