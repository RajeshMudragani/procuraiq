import {
    IsArray,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreateEvaluationItemDto } from '../../evaluation-item/dto/create-evaluation-item.dto';

export class CreateEvaluationDto {

    @IsString()
    rfqId!: string;

    @IsString()
    evaluatedBy!: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(
        () => CreateEvaluationItemDto,
    )
    items!: CreateEvaluationItemDto[];
}