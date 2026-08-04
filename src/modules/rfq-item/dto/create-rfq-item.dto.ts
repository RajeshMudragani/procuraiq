import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateRfqItemDto {

    @ApiProperty({
        example: 'Dell Latitude 5440',
        description: 'Item name',
    })
    @IsString()
    itemName!: string;

    @ApiPropertyOptional({
        example: 'Business Laptop',
        description: 'Item description',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        example: 100,
        description: 'Required quantity',
    })
    @IsNumber()
    quantity!: number;

    @ApiProperty({
        example: 'NOS',
        description: 'Unit of Measure',
    })
    @IsString()
    uom!: string;

    @ApiPropertyOptional({
        example: 62000,
        description: 'Target price per unit',
    })
    @IsOptional()
    @IsNumber()
    targetPrice?: number;
}