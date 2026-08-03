import { Module } from '@nestjs/common';
import { AwardItemRepository } from './award-item.repository';
import { AwardItemService } from './award-item.service';

@Module({
    providers: [
        AwardItemRepository,
        AwardItemService,
    ],

    exports: [
        AwardItemService,
    ],
})
export class AwardItemModule {}