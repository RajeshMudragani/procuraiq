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
import { CreateRfqSupplierDto } from './dto/create-rfq-supplier.dto';
import { UpdateRfqSupplierDto } from './dto/update-rfq-supplier.dto';
import { RfqSupplierService } from './rfq-supplier.service';

@ApiTags(
    'RFQ Suppliers',
)
@Controller(
    'rfq-suppliers',
)
export class RfqSupplierController {

    constructor(
        private readonly service: RfqSupplierService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateRfqSupplierDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get()
    findAll() {
        return this.service.findAll();
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

    @Get('rfq/:rfqId')
    findByRfq(
        @Param('rfqId')
        rfqId: string,
    ) {
        return this.service.findByRfq(
            rfqId,
        );
    }

    @Patch(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRfqSupplierDto,
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