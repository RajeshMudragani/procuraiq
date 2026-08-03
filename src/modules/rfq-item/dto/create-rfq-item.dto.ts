import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateRfqItemDto {
    @IsString()
    itemName!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    quantity!: number;

    @IsString()
    uom!: string;

    @IsOptional()
    @IsNumber()
    targetPrice?: number;
}