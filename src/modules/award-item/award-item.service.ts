import { Injectable } from '@nestjs/common';
import { AwardItemRepository } from './award-item.repository';

@Injectable()
export class AwardItemService {

    constructor(
        private readonly repository:
            AwardItemRepository,
    ) {}

    createMany(
        awardId: string,
        items: any[],
    ) {

        return this.repository.createMany(
            items.map(
                item => ({
                    awardId,
                    ...item,
                    totalAmount: item.awardedQuantity * item.unitPrice,
                }),
            ),
        );
    }

    findByAward(
        awardId: string,
    ) {
        return this.repository.findByAward(
            awardId,
        );
    }
}