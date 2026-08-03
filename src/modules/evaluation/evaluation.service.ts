import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EvaluationStatus, QuotationStatus } from '@prisma/client';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationItemService } from '../evaluation-item/evaluation-item.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { QuotationRepository } from '../quotation/quotation.repository';

@Injectable()
export class EvaluationService {

    constructor(
        private readonly repository: EvaluationRepository,
        private readonly itemService: EvaluationItemService,
        private readonly quotationRepository: QuotationRepository,
    ) {}

    async create(
        dto: CreateEvaluationDto,
    ) {

        for (
            const item
            of dto.items
        ) {

            const quotation =
                await this.quotationRepository.findById(
                    item.quotationId,
                );

            if (!quotation) {
                throw new NotFoundException(
                    'Quotation not found',
                );
            }

            if (
                quotation.status !==
                QuotationStatus.SUBMITTED
            ) {
                throw new BadRequestException(
                    'Quotation must be submitted before evaluation',
                );
            }
        }

        const evaluation =
            await this.repository.create({
                rfqId:
                    dto.rfqId,

                evaluationNumber:
                    `EV-${Date.now()}`,

                evaluatedBy:
                    dto.evaluatedBy,

                notes:
                    dto.notes,
            });

        await this.itemService.createMany(
            evaluation.id,
            dto.items,
        );

        return this.findById(
            evaluation.id,
        );
    }

    async findById(
        id: string,
    ) {

        const evaluation =
            await this.repository.findById(
                id,
            );

        if (!evaluation) {
            throw new NotFoundException(
                'Evaluation not found',
            );
        }

        const items =
            await this.itemService.findByEvaluation(
                id,
            );

        return {
            ...evaluation,
            items,
        };
    }

    findAll() {
        return this.repository.findAll();
    }

    async complete(
        id: string,
    ) {

        const evaluation = await this.repository.findById(
            id,
        );

        if (!evaluation) {
            throw new NotFoundException(
                'Evaluation not found',
            );
        }

        if (
            evaluation.status !==
            EvaluationStatus.DRAFT
        ) {
            throw new BadRequestException(
                'Evaluation is already completed',
            );
        }

        return this.repository.update(
            id,
            {
                status: EvaluationStatus.COMPLETED,
            },
        );
    }
}