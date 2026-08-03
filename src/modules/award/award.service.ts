import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { AwardStatus, EvaluationStatus } from '@prisma/client';
import { AwardRepository } from './award.repository';
import { AwardItemService } from '../award-item/award-item.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { EvaluationRepository } from '../evaluation/evaluation.repository';

@Injectable()
export class AwardService {

    constructor(
        private readonly repository: AwardRepository,
        private readonly itemService: AwardItemService,
        private readonly evaluationRepository: EvaluationRepository,
    ) {}

    async create(
        dto: CreateAwardDto,
    ) {

        const evaluation = await this.evaluationRepository.findById(
            dto.evaluationId,
        );

        if (!evaluation) {
            throw new NotFoundException(
                'Evaluation not found',
            );
        }

        if (
            evaluation.status !==
            EvaluationStatus.COMPLETED
        ) {
            throw new BadRequestException(
                'Evaluation must be completed before award',
            );
        }

        const award = await this.repository.create({
            rfqId: dto.rfqId,
            evaluationId: dto.evaluationId,
            supplierId: dto.supplierId,
            awardNumber: `AWD-${Date.now()}`,
            awardedBy: dto.awardedBy,
            remarks: dto.remarks,
        });

        await this.itemService.createMany(
            award.id,
            dto.items,
        );

        return this.findById(
            award.id,
        );
    }

    async findById(
        id: string,
    ) {

        const award = await this.repository.findById(
            id,
        );

        if (!award) {
            throw new NotFoundException(
                'Award not found',
            );
        }

        const items = await this.itemService.findByAward(
            id,
        );

        return {
            ...award,
            items,
        };
    }

    findAll() {
        return this.repository.findAll();
    }

    async award(
        id: string,
    ) {

        const award = await this.repository.findById(
            id,
        );

        if (!award) {
            throw new NotFoundException(
                'Award not found',
            );
        }

        if (
            award.status !==
            AwardStatus.DRAFT
        ) {
            throw new BadRequestException(
                'Award has already been processed',
            );
        }

        return this.repository.update(
            id,
            {
                status: AwardStatus.AWARDED,
                awardedAt: new Date(),
            },
        );
    }

    cancel(
        id: string,
    ) {
        return this.repository.update(
            id,
            {
                status: AwardStatus.CANCELLED,
            },
        );
    }
}
