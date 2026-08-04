import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import { EvaluationStatus } from '@prisma/client';

export class EvaluationResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty({
        example: '9feaf695-1b63-43d7-88dc-07335fdc5698',
    })
    rfqId!: string;

    @ApiProperty({
        example: 'EV-2026-0001',
    })
    evaluationNumber!: string;

    @ApiProperty({
        enum: EvaluationStatus,
    })
    status!: EvaluationStatus;

    @ApiProperty({
        example: 'Rajesh Mudragani',
    })
    evaluatedBy!: string;

    @ApiPropertyOptional({
        example: 'Best commercial offer selected',
    })
    notes?: string | null;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

    @ApiProperty({
        type: 'array',
    })
    items!: any[];
}