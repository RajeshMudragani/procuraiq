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
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierService } from './supplier.service';

@ApiTags(
    'Suppliers',
)
@Controller(
    'suppliers',
)
export class SupplierController {

    constructor(
        private readonly supplierService:
            SupplierService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateSupplierDto,
    ) {
        return this.supplierService.create(
            dto,
        );
    }

    @Get()
    findAll() {
        return this.supplierService.findAll();
    }

    @Get(':id')
    findById(
        @Param('id')
        id: string,
    ) {
        return this.supplierService.findById(
            id,
        );
    }

    @Patch(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateSupplierDto,
    ) {
        return this.supplierService.update(
            id,
            dto,
        );
    }

    @Delete(':id')
    delete(
        @Param('id')
        id: string,
    ) {
        return this.supplierService.delete(
            id,
        );
    }
}