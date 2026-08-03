import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateEvaluationItemDto {

    @IsString()
    quotationId!: string;

    @IsString()
    supplierId!: string;

    @IsNumber()
    priceScore!: number;

    @IsNumber()
    deliveryScore!: number;

    @IsNumber()
    qualityScore!: number;

    @IsOptional()
    @IsString()
    remarks?: string;
}