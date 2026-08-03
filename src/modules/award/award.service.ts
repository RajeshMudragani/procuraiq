import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { AwardStatus } from '@prisma/client';
import { AwardRepository } from './award.repository';
import { AwardItemService } from '../award-item/award-item.service';
import { CreateAwardDto } from './dto/create-award.dto';

@Injectable()
export class AwardService {

    constructor(
        private readonly repository: AwardRepository,
        private readonly itemService: AwardItemService,
    ) {}

    async create(
        dto: CreateAwardDto,
    ) {

        const award =
            await this.repository.create({
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

    award(
        id: string,
    ) {
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
