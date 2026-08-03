import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EvaluationStatus } from '@prisma/client';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationItemService } from '../evaluation-item/evaluation-item.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';

@Injectable()
export class EvaluationService {

    constructor(
        private readonly repository:
            EvaluationRepository,

        private readonly itemService:
            EvaluationItemService,
    ) {}

    async create(
        dto: CreateEvaluationDto,
    ) {

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

    complete(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status:
                    EvaluationStatus.COMPLETED,
            },
        );
    }
}