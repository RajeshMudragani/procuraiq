import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateAwardItemDto {

    @IsString()
    rfqItemId!: string;

    @IsString()
    quotationItemId!: string;

    @IsNumber()
    awardedQuantity!: number;

    @IsNumber()
    unitPrice!: number;

    @IsOptional()
    @IsString()
    remarks?: string;
}