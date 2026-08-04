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

import { CreateAwardDto } from './dto/create-award.dto';
import { AwardService } from './award.service';
import {
    SubmitAwardForApprovalDto
} from './dto/submit-award-for-approval.dto';
@ApiTags('Award')
@Controller('awards')
export class AwardController {

    constructor(
        private readonly service: AwardService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create award',
        description:
            'Creates an award from a completed evaluation.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Award created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid award payload.',
    })
    create(
        @Body()
        dto: CreateAwardDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all awards',
        description:
            'Retrieves all awards.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Awards retrieved successfully.',
    })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get award by ID',
        description:
            'Retrieves award details including awarded items.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Award identifier',
        example:
            'award-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Award retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Award not found.',
    })
    findById(
        @Param('id')
        id: string,
    ) {
        return this.service.findById(
            id,
        );
    }

    @Post(':id/award')
    @ApiOperation({
        summary: 'Approve award',
        description:
            'Marks the award as awarded and finalises supplier selection.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Award identifier',
        example:
            'award-001',
    })
    @ApiResponse({
        status: 201,
        description:
            'Award completed successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Award already completed or invalid state.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Award not found.',
    })
    award(
        @Param('id')
        id: string,
    ) {
        return this.service.award(
            id,
        );
    }

    @Post(':id/cancel')
    @ApiOperation({
        summary: 'Cancel award',
        description:
            'Cancels the award.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Award identifier',
        example:
            'award-001',
    })
    @ApiResponse({
        status: 201,
        description:
            'Award cancelled successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Award not found.',
    })
    cancel(
        @Param('id')
        id: string,
    ) {
        return this.service.cancel(
            id,
        );
    }

    @Post(':id/submit-for-approval')
    
    submitForApproval(
        @Param('id')
        id: string,

        @Body()
        dto: SubmitAwardForApprovalDto,
    ) {
        return this.service.submitForApproval(
            id,
            dto,
        );
    }
}