import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { CreateQuotationDto } from './dto/create-quotation.dto';
import { QuotationService } from './quotation.service';

@ApiTags('Quotation')
@Controller('quotations')
export class QuotationController {

    constructor(
        private readonly service: QuotationService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create quotation',
        description:
            'Creates a supplier quotation for an RFQ.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Quotation created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid quotation payload.',
    })
    create(
        @Body()
        dto: CreateQuotationDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all quotations',
        description:
            'Retrieves all quotations.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Quotations retrieved successfully.',
    })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get quotation by ID',
        description:
            'Retrieves quotation details including quotation items.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Quotation identifier',
        example:
            'quotation-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Quotation retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Quotation not found.',
    })
    findById(
        @Param('id')
        id: string,
    ) {
        return this.service.findById(
            id,
        );
    }

    @Post(':id/submit')
    @ApiOperation({
        summary: 'Submit quotation',
        description:
            'Submits quotation for evaluation.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Quotation identifier',
        example:
            'quotation-001',
    })
    @ApiResponse({
        status: 201,
        description:
            'Quotation submitted successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Quotation already submitted or invalid state.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Quotation not found.',
    })
    submit(
        @Param('id')
        id: string,
    ) {
        return this.service.submit(
            id,
        );
    }
}