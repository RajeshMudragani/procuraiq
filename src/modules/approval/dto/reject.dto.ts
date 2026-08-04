import {
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class RejectDto {

    @ApiProperty({
        example: 'manager-001',
        description: 'Current approver identifier',
    })
    @IsString()
    approverId!: string;

    @ApiPropertyOptional({
        example: 'Budget exceeds approved limit',
        description: 'Rejection reason',
    })
    @IsOptional()
    @IsString()
    comments?: string;
}