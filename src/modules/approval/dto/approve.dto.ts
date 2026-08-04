import {
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class ApproveDto {

    @ApiProperty({
        example: 'manager-001',
        description: 'Current approver identifier',
    })
    @IsString()
    approverId!: string;

    @ApiPropertyOptional({
        example: 'Manager approved the RFQ',
        description: 'Approval comments',
    })
    @IsOptional()
    @IsString()
    comments?: string;
}