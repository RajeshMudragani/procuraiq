import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { QuotationService } from './quotation.service';

@ApiTags(
    'Quotations',
)
@Controller(
    'quotations',
)
export class QuotationController {

    constructor(
        private readonly service:
            QuotationService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateQuotationDto,
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

    @Post(':id/submit')
    submit(
        @Param('id')
        id: string,
    ) {
        return this.service.submit(
            id,
        );
    }
}