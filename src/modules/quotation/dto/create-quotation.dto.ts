import {
    IsArray,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreateQuotationItemDto } from '../../quotation-item/dto/create-quotation-item.dto';

export class CreateQuotationDto {

    @IsString()
    rfqId!: string;

    @IsString()
    supplierId!: string;

    @IsOptional()
    @IsString()
    remarks?: string;

    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(
        () => CreateQuotationItemDto,
    )
    items!: CreateQuotationItemDto[];
}