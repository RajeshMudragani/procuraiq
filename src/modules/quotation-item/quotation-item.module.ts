import { Module } from '@nestjs/common';
import { QuotationItemRepository } from './quotation-item.repository';
import { QuotationItemService } from './quotation-item.service';

@Module({
    providers: [
        QuotationItemRepository,
        QuotationItemService,
    ],

    exports: [
        QuotationItemService,
    ],
})
export class QuotationItemModule {}