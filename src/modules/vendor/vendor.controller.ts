import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import {
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

import { VendorService } from './vendor.service';

import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { VendorFilterDto } from './dto/vendor-filter.dto';

@ApiTags('Vendors')
@Controller('vendors')
export class VendorController {
    constructor(
        private readonly service: VendorService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateVendorDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get()
    @ApiQuery({
        name: 'status',
        required: false,
    })
    @ApiQuery({
        name: 'type',
        required: false,
    })
    @ApiQuery({
        name: 'name',
        required: false,
    })
    findAll(
        @Query()
        filters: VendorFilterDto,
    ) {
        return this.service.findAll(
            filters.status,
            filters.type,
            filters.name,
        );
    }

    @Get(':id')
    findById(
        @Param('id')
        id: string,
    ) {
        return this.service.findById(
            id,
        );
    }

    @Patch(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateVendorDto,
    ) {
        return this.service.update(
            id,
            dto,
        );
    }

    @Delete(':id')
    delete(
        @Param('id')
        id: string,
    ) {
        return this.service.delete(
            id,
        );
    }
}