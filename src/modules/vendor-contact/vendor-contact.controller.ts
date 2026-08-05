import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { VendorContactService } from './vendor-contact.service';

import { CreateVendorContactDto } from './dto/create-vendor-contact.dto';
import { UpdateVendorContactDto } from './dto/update-vendor-contact.dto';

@ApiTags('Vendor Contacts')
@Controller('vendors')
export class VendorContactController {
    constructor(
        private readonly service: VendorContactService,
    ) {}

    @Post(':vendorId/contacts')
    create(
        @Param('vendorId')
        vendorId: string,

        @Body()
        dto: CreateVendorContactDto,
    ) {
        return this.service.create(
            vendorId,
            dto,
        );
    }

    @Get(':vendorId/contacts')
    findByVendor(
        @Param('vendorId')
        vendorId: string,
    ) {
        return this.service.findByVendor(
            vendorId,
        );
    }

    @Patch('contacts/:id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateVendorContactDto,
    ) {
        return this.service.update(
            id,
            dto,
        );
    }

    @Delete('contacts/:id')
    delete(
        @Param('id')
        id: string,
    ) {
        return this.service.delete(
            id,
        );
    }
}