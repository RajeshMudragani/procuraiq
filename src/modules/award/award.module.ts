import { Module } from '@nestjs/common';
import { AwardItemModule } from '../award-item/award-item.module';
import { AwardController } from './award.controller';
import { AwardRepository } from './award.repository';
import { AwardService } from './award.service';

@Module({
    imports: [
        AwardItemModule,
    ],

    controllers: [
        AwardController,
    ],

    providers: [
        AwardRepository,
        AwardService,
    ],

    exports: [
        AwardService,
    ],
})
export class AwardModule {}
