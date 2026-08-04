import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    RfqStatus,
} from '@prisma/client';

export class RfqItemResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty()
    rfqId!: string;

    @ApiProperty({
        example: 'Dell Latitude 5440',
    })
    itemName!: string;

    @ApiPropertyOptional({
        example: 'Business Laptop',
    })
    description?: string | null;

    @ApiProperty({
        example: 100,
    })
    quantity!: number;

    @ApiProperty({
        example: 'NOS',
    })
    uom!: string;

    @ApiPropertyOptional({
        example: 62000,
    })
    targetPrice?: number | null;

    @ApiProperty()
    createdAt!: Date;
}

export class RfqResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty()
    tenantId!: string;

    @ApiProperty({
        example: 'RFQ-2026-1785825656639',
    })
    rfqNumber!: string;

    @ApiProperty({
        example: 'Dell Laptop Procurement',
    })
    title!: string;

    @ApiPropertyOptional({
        example: 'RFQ approval workflow testing',
    })
    description?: string | null;

    @ApiProperty({
        enum: RfqStatus,
    })
    status!: RfqStatus;

    @ApiProperty({
        example: 'INR',
    })
    currency!: string;

    @ApiProperty()
    submissionDeadline!: Date;

    @ApiProperty({
        example: 'Rajesh Mudragani',
    })
    createdBy!: string;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

    @ApiProperty({
        type: [RfqItemResponseDto],
    })
    items!: RfqItemResponseDto[];
}
