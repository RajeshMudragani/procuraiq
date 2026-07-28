import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
    @ApiProperty({
        example: 'user.create',
        description: 'Unique permission code',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    code!: string;

    @ApiProperty({
        example: 'Create User',
        description: 'Permission display name',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @ApiProperty({
        example: 'Allows user creation',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}