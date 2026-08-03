import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierRepository } from './supplier.repository';
import { SupplierService } from './supplier.service';
import { EventsModule } from '../../core/events/events.module';

@Module({
    imports: [
        EventsModule,
    ],

    controllers: [
        SupplierController,
    ],

    providers: [
        SupplierRepository,
        SupplierService,
    ],

    exports: [
        SupplierService,
    ],
})
export class SupplierModule {}
