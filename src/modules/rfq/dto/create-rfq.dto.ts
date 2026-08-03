import {
    IsArray,
    IsDateString,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreateRfqItemDto } from '../../rfq-item/dto/create-rfq-item.dto';

export class CreateRfqDto {
    @IsString()
    tenantId!: string;

    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    currency!: string;

    @IsDateString()
    submissionDeadline!: Date;

    @IsString()
    createdBy!: string;

    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(
        () => CreateRfqItemDto,
    )
    items!: CreateRfqItemDto[];
}