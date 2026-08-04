import { Module, forwardRef } from '@nestjs/common';

import { RfqModule } from '../rfq/rfq.module';
import { QuotationItemModule } from '../quotation-item/quotation-item.module';

import { QuotationController } from './quotation.controller';
import { QuotationRepository } from './quotation.repository';
import { QuotationService } from './quotation.service';

@Module({
    imports: [
        QuotationItemModule,
        forwardRef(() => RfqModule),
    ],

    controllers: [
        QuotationController,
    ],

    providers: [
        QuotationRepository,
        QuotationService,
    ],

    exports: [
        QuotationRepository,
        QuotationService,
    ],
})
export class QuotationModule {}