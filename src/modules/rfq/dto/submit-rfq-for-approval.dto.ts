import {
    IsArray,
    IsInt,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ApprovalStepDto {

    @ApiProperty({
        example: 1,
        description: 'Approval sequence',
    })
    @IsInt()
    stepNumber!: number;

    @ApiProperty({
        example: 'manager-001',
        description: 'Approver identifier',
    })
    @IsString()
    approverId!: string;
}

export class SubmitRfqForApprovalDto {

    @ApiProperty({
        example: 'Rajesh Mudragani',
        description: 'User submitting RFQ for approval',
    })
    @IsString()
    requestedBy!: string;

    @ApiProperty({
        type: [ApprovalStepDto],
        description: 'Sequential approval workflow',
        example: [
            {
                stepNumber: 1,
                approverId: 'manager-001',
            },
            {
                stepNumber: 2,
                approverId: 'procurement-head-001',
            },
            {
                stepNumber: 3,
                approverId: 'finance-001',
            },
        ],
    })
    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(() => ApprovalStepDto)
    steps!: ApprovalStepDto[];
}