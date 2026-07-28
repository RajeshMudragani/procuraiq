import { ApiProperty } from '@nestjs/swagger';

import {
    IsUUID,
} from 'class-validator';

export class AssignRoleDto {
    @ApiProperty({
        example:
        '7ac373c1-c13c-4a41-ba34-f21801b50bb8',
    })
    @IsUUID()
    userId!: string;

    @ApiProperty({
        example:
        'd1bff0a6-7f0a-4caa-b1df-b1f9dd2c3cd7',
    })
    @IsUUID()
    roleId!: string;
}