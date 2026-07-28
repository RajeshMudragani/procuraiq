import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        example: 'bf1fcc1b-ea4c-4feb-8904-7579b89751c8',
        description: 'Tenant identifier',
    })
    @IsUUID()
    tenantId!: string;

    @ApiProperty({
        example: 'Admin',
        description: 'Role name',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @ApiProperty({
        example: 'System administrator role',
        description: 'Role description',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}