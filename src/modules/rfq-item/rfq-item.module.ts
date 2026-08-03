import { Module } from '@nestjs/common';
import { RfqItemRepository } from './rfq-item.repository';
import { RfqItemService } from './rfq-item.service';

@Module({
    providers: [
        RfqItemRepository,
        RfqItemService,
    ],

    exports: [
        RfqItemService,
    ],
})
export class RfqItemModule {}
