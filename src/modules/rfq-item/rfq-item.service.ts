import { Injectable } from '@nestjs/common';

import { CreateRfqItemDto }
from './dto/create-rfq-item.dto';

import { UpdateRfqItemDto }
from './dto/update-rfq-item.dto';

import { RfqItemRepository }
from './rfq-item.repository';

@Injectable()
export class RfqItemService {
    constructor(
        private readonly repository: RfqItemRepository,
    ) {}

    createMany(
        rfqId: string,
        items: CreateRfqItemDto[],
    ) {
        return this.repository.createMany(
            items.map(
                item => ({
                    rfqId,
                    itemName: item.itemName,
                    description: item.description,
                    quantity: item.quantity,
                    uom: item.uom,
                    targetPrice: item.targetPrice,
                }),
            ),
        );
    }

    findByRfq(
        rfqId: string,
    ) {
        return this.repository.findByRfq(
            rfqId,
        );
    }

    update(
        id: string,
        dto: UpdateRfqItemDto,
    ) {
        return this.repository.update(
            id,
            dto,
        );
    }

    delete(
        id: string,
    ) {
        return this.repository.delete(
            id,
        );
    }
}
