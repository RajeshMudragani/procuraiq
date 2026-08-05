import { Module } from '@nestjs/common';
import { AuditModule } from '../../core/audit/audit.module';
import { VendorModule } from '../vendor/vendor.module';
import { VendorContactController } from './vendor-contact.controller';
import { VendorContactService } from './vendor-contact.service';
import { VendorContactRepository } from './vendor-contact.repository';

@Module({
    imports: [
        AuditModule,
        VendorModule,
    ],

    controllers: [
        VendorContactController,
    ],

    providers: [
        VendorContactRepository,
        VendorContactService,
    ],

    exports: [
        VendorContactService,
    ],
})
export class VendorContactModule {}