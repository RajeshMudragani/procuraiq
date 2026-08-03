import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateQuotationItemDto {

    @IsString()
    rfqItemId!: string;

    @IsNumber()
    unitPrice!: number;

    @IsNumber()
    quantity!: number;

    @IsOptional()
    @IsNumber()
    leadTimeDays?: number;

    @IsOptional()
    @IsString()
    remarks?: string;
}
