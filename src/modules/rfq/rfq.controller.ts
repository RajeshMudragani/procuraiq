import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { CreateRfqDto } from './dto/create-rfq.dto';
import { UpdateRfqDto } from './dto/update-rfq.dto';
import { RfqService } from './rfq.service';
import { SubmitRfqForApprovalDto } from './dto/submit-rfq-for-approval.dto';
import { RfqResponseDto } from './dto/rfq-response.dto';

@ApiTags('RFQ')
@Controller('rfqs')
export class RfqController {

    constructor(
        private readonly rfqService: RfqService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create RFQ',
        description:
            'Creates a new Request for Quotation (RFQ) with RFQ items.',
    })
    @ApiResponse({
        status: 201,
        description:
            'RFQ created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid RFQ payload.',
    })
    create(
        @Body()
        dto: CreateRfqDto,
    ) {
        return this.rfqService.create(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all RFQs',
        description:
            'Retrieves all RFQs.',
    })
    @ApiResponse({
        status: 200,
        description:
            'RFQs retrieved successfully.',
    })
    findAll() {
        return this.rfqService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get RFQ by ID',
        description:
            'Retrieves RFQ details including RFQ items.',
    })
    @ApiParam({
        name: 'id',
        description: 'RFQ identifier',
        example:
            '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    @ApiResponse({
        status: 200,
        description: 'RFQ retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'RFQ not found.',
    })
    findById(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.findById(
            id,
        );
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update RFQ',
        description:
            'Updates RFQ information.',
    })
    @ApiParam({
        name: 'id',
        description: 'RFQ identifier',
        example:
            '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    @ApiResponse({
        status: 200,
        description:
            'RFQ updated successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'RFQ not found.',
    })
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRfqDto,
    ) {
        return this.rfqService.update(
            id,
            dto,
        );
    }

    @Post(':id/submit-for-approval')
    @ApiOperation({
        summary: 'Submit RFQ for approval',
        description:
            'Starts approval workflow for the RFQ.',
    })
    @ApiParam({
        name: 'id',
        description: 'RFQ identifier',
        example:
            '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    @ApiResponse({
        status: 201,
        description:
            'RFQ submitted for approval successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Only draft RFQs can be submitted for approval.',
    })
    submitForApproval(
        @Param('id')
        id: string,

        @Body()
        dto: SubmitRfqForApprovalDto,
    ) {
        return this.rfqService.submitForApproval(
            id,
            dto,
        );
    }

    @Post(':id/publish')
    @ApiOperation({
        summary: 'Publish RFQ',
        description:
            'Publishes RFQ after approval is completed.',
    })
    @ApiParam({
        name: 'id',
        description: 'RFQ identifier',
        example:
            '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    @ApiResponse({
        status: 201,
        description:
            'RFQ published successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'RFQ approval not completed.',
    })
    publish(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.publish(
            id,
        );
    }

    @Post(':id/close')
    @ApiOperation({
        summary: 'Close RFQ',
        description:
            'Closes RFQ and prevents additional quotations.',
    })
    @ApiParam({
        name: 'id',
        description: 'RFQ identifier',
        example:
            '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    @ApiResponse({
        status: 201,
        description:
            'RFQ closed successfully.',
    })
    close(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.close(
            id,
        );
    }

    @Post(':id/cancel')
    @ApiOperation({
        summary: 'Cancel RFQ',
        description:
            'Cancels RFQ.',
    })
    @ApiParam({
        name: 'id',
        description: 'RFQ identifier',
        example:
            '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    @ApiResponse({
        status: 201,
        description:
            'RFQ cancelled successfully.',
    })
    cancel(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.cancel(
            id,
        );
    }
}