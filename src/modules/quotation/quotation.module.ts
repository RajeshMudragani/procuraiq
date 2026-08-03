import { Module } from '@nestjs/common';
import { QuotationItemModule } from '../quotation-item/quotation-item.module';
import { QuotationController } from './quotation.controller';
import { QuotationRepository } from './quotation.repository';
import { QuotationService } from './quotation.service';

@Module({
    imports: [
        QuotationItemModule,
    ],

    controllers: [
        QuotationController,
    ],

    providers: [
        QuotationRepository,
        QuotationService,
    ],

    exports: [
        QuotationService,
    ],
})
export class QuotationModule {}