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

import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationService } from './evaluation.service';

@ApiTags('Evaluation')
@Controller('evaluations')
export class EvaluationController {

    constructor(
        private readonly service: EvaluationService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create evaluation',
        description:
            'Creates a supplier evaluation for an RFQ.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Evaluation created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid evaluation payload.',
    })
    create(
        @Body()
        dto: CreateEvaluationDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all evaluations',
        description:
            'Retrieves all evaluations.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Evaluations retrieved successfully.',
    })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get evaluation by ID',
        description:
            'Retrieves evaluation details including evaluated suppliers.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Evaluation identifier',
        example:
            'evaluation-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Evaluation retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Evaluation not found.',
    })
    findById(
        @Param('id')
        id: string,
    ) {
        return this.service.findById(
            id,
        );
    }

    @Post(':id/complete')
    @ApiOperation({
        summary: 'Complete evaluation',
        description:
            'Marks evaluation as completed and finalises supplier scoring.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Evaluation identifier',
        example:
            'evaluation-001',
    })
    @ApiResponse({
        status: 201,
        description:
            'Evaluation completed successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Evaluation already completed or invalid state.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Evaluation not found.',
    })
    complete(
        @Param('id')
        id: string,
    ) {
        return this.service.complete(
            id,
        );
    }
}