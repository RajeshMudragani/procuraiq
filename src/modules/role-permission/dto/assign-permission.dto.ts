import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

export class AssignPermissionDto {
    @ApiProperty({
        example:
        '7a42fa1d-1859-4c4f-ae9f-f3d34413f36d',
    })
    @IsUUID()
    roleId!: string;

    @ApiProperty({
        example:
        '31f9c8ce-9e24-445c-85a3-d4f4d80c8122',
    })
    @IsUUID()
    permissionId!: string;
}