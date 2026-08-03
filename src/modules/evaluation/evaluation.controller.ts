import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationService } from './evaluation.service';

@ApiTags(
    'Evaluations',
)
@Controller(
    'evaluations',
)
export class EvaluationController {

    constructor(
        private readonly service:
            EvaluationService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateEvaluationDto,
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

    @Post(':id/complete')
    complete(
        @Param('id')
        id: string,
    ) {
        return this.service.complete(
            id,
        );
    }
}