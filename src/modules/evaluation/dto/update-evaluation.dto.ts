import {
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateEvaluationDto {

    @ApiPropertyOptional({
        example: 'Evaluation updated after clarification meeting',
        description: 'Evaluation notes',
    })
    @IsOptional()
    @IsString()
    notes?: string;
}