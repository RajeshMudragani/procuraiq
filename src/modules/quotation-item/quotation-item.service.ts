import { Injectable } from '@nestjs/common';
import { QuotationItemRepository } from './quotation-item.repository';

@Injectable()
export class QuotationItemService {

    constructor(
        private readonly repository: QuotationItemRepository,
    ) {}

    createMany(
        quotationId: string,
        items: any[],
    ) {
        return this.repository.createMany(
            items.map(
                item => ({
                    quotationId,
                    ...item,
                }),
            ),
        );
    }

    findByQuotation(
        quotationId: string,
    ) {
        return this.repository.findByQuotation(
            quotationId,
        );
    }
}