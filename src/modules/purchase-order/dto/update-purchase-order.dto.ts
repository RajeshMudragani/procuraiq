import {
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdatePurchaseOrderDto {

    @ApiPropertyOptional({
        example: 'Delivery date updated after supplier discussion',
        description: 'Purchase order remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}
