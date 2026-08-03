import {
    IsArray,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreatePurchaseOrderItemDto } from '../../purchase-order-item/dto/create-purchase-order-item.dto';

export class CreatePurchaseOrderDto {

    @IsString()
    awardId!: string;

    @IsString()
    supplierId!: string;

    @IsString()
    currency!: string;

    @IsString()
    issuedBy!: string;

    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(
        () =>
            CreatePurchaseOrderItemDto,
    )
    items!: CreatePurchaseOrderItemDto[];
}