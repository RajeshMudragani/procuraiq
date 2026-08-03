import { Module } from '@nestjs/common';
import { EventsModule } from '../../core/events/events.module';
import { RfqItemModule } from '../rfq-item/rfq-item.module';
import { RfqController } from './rfq.controller';
import { RfqRepository } from './rfq.repository';
import { RfqService } from './rfq.service';

@Module({
    imports: [
        EventsModule,
        RfqItemModule,
    ],

    controllers: [
        RfqController,
    ],

    providers: [
        RfqRepository,
        RfqService,
    ],

    exports: [
        RfqRepository,
        RfqService,
    ],
})
export class RfqModule {}