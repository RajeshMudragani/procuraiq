import { Module } from '@nestjs/common';
import { EventsModule } from '../../core/events/events.module';
import { RfqSupplierController } from './rfq-supplier.controller';
import { RfqSupplierRepository } from './rfq-supplier.repository';
import { RfqSupplierService } from './rfq-supplier.service';

@Module({
    imports: [
        EventsModule,
    ],

    controllers: [
        RfqSupplierController,
    ],

    providers: [
        RfqSupplierRepository,
        RfqSupplierService,
    ],

    exports: [
        RfqSupplierService,
    ],
})
export class RfqSupplierModule {}