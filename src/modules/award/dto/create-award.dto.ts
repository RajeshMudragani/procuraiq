import {
    IsArray,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreateAwardItemDto } from '../../award-item/dto/create-award-item.dto';

export class CreateAwardDto {

    @IsString()
    rfqId!: string;

    @IsString()
    evaluationId!: string;

    @IsString()
    supplierId!: string;

    @IsString()
    awardedBy!: string;

    @IsOptional()
    @IsString()
    remarks?: string;

    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(
        () => CreateAwardItemDto,
    )
    items!: CreateAwardItemDto[];
}