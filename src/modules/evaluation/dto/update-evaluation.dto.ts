import {
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateEvaluationDto {

    @IsOptional()
    @IsString()
    notes?: string;
}