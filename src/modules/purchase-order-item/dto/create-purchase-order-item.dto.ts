import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreatePurchaseOrderItemDto {

    @IsString()
    awardItemId!: string;

    @IsString()
    itemName!: string;

    @IsNumber()
    quantity!: number;

    @IsNumber()
    unitPrice!: number;

    @IsOptional()
    @IsString()
    remarks?: string;
}