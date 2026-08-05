import { Module } from '@nestjs/common';
import { AuditModule } from '../../core/audit/audit.module';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { VendorRepository } from './vendor.repository';

@Module({
    imports: [
        AuditModule,
    ],

    controllers: [
        VendorController,
    ],

    providers: [
        VendorRepository,
        VendorService,
    ],

    exports: [
        VendorRepository,
        VendorService,
    ],
})
export class VendorModule {}