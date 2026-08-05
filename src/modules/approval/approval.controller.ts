import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
    ApiQuery,
} from '@nestjs/swagger';

import { ApprovalService } from './approval.service';

import { CreateApprovalDto } from './dto/create-approval.dto';
import { ApproveDto } from './dto/approve.dto';
import { RejectDto } from './dto/reject.dto';
import { ApprovalSubmissionService } from './approval-submission.service';
import { ApprovalStatus } from '@prisma/client';

@ApiTags('Approval')
@Controller('approvals')
export class ApprovalController {

    constructor(
        private readonly service: ApprovalService,
        private readonly approvalSubmissionService: ApprovalSubmissionService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create approval workflow',
        description:
            'Creates a new approval workflow with one or more approval steps.',
    })
    @ApiResponse({
        status: 201,
        description: 'Approval workflow created successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid request payload.',
    })
    create(
        @Body()
        dto: CreateApprovalDto,
    ) {
        return this.approvalSubmissionService.create(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all approvals',
        description:
            'Retrieves all approval workflows including their steps.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Approvals retrieved successfully.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Approval retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Approval not found.',
    })
    @ApiQuery({
        name: 'status',
        required: false,
        enum: ApprovalStatus,
    })
    findAll(
        @Query('status')
        status?: ApprovalStatus
    ) {
        return this.service.findAll(status);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get approval by ID',
        description:
            'Retrieves approval workflow details including all approval steps.',
    })
    @ApiParam({
        name: 'id',
        description: 'Approval identifier',
        example:
            '26585e97-04a0-4034-8f75-1f309732f449',
    })
    @ApiResponse({
        status: 200,
        description:
            'Approval retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Approval not found.',
    })
    findById(
        @Param('id')
        id: string,
    ) {
        return this.service.findById(
            id,
        );
    }

    @Post(':id/approve')
    @ApiOperation({
        summary: 'Approve current approval step',
        description:
            'Approves the current pending approval step and moves workflow to the next step if available.',
    })
    @ApiParam({
        name: 'id',
        description: 'Approval identifier',
        example:
            '26585e97-04a0-4034-8f75-1f309732f449',
    })
    @ApiResponse({
        status: 201,
        description:
            'Approval step processed successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid approver, approval already completed, or step already processed.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Approval or approval step not found.',
    })
    approve(
        @Param('id')
        id: string,

        @Body()
        dto: ApproveDto,
    ) {
        return this.service.approve(
            id,
            dto,
        );
    }

    @Post(':id/reject')
    @ApiOperation({
        summary: 'Reject current approval step',
        description:
            'Rejects the current approval step and marks the approval workflow as rejected.',
    })
    @ApiParam({
        name: 'id',
        description: 'Approval identifier',
        example:
            '26585e97-04a0-4034-8f75-1f309732f449',
    })
    @ApiResponse({
        status: 201,
        description:
            'Approval rejected successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid approver, approval already completed, or step already processed.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Approval or approval step not found.',
    })
    reject(
        @Param('id')
        id: string,

        @Body()
        dto: RejectDto,
    ) {
        return this.service.reject(
            id,
            dto,
        );
    }
}