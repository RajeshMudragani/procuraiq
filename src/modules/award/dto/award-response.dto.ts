import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    AwardStatus,
} from '@prisma/client';

export class AwardResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty({
        example: '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    rfqId!: string;

    @ApiProperty({
        example: 'evaluation-001',
    })
    evaluationId!: string;

    @ApiProperty({
        example: 'supplier-001',
    })
    supplierId!: string;

    @ApiProperty({
        example: 'AWD-2026-0001',
    })
    awardNumber!: string;

    @ApiProperty({
        enum: AwardStatus,
    })
    status!: AwardStatus;

    @ApiProperty({
        example: 'Rajesh Mudragani',
    })
    awardedBy!: string;

    @ApiPropertyOptional()
    awardedAt?: Date | null;

    @ApiPropertyOptional({
        example: 'Supplier selected based on technical and commercial evaluation',
    })
    remarks?: string | null;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

    @ApiProperty({
        type: 'array',
    })
    items!: any[];
}