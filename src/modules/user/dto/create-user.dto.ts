import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'bc7f4ec4-d4be-4469-9cf6-c0eea9a61eac',
    description: 'Tenant identifier',
    format: 'uuid',
  })
  @IsUUID()
  tenantId!: string;

  @ApiProperty({
    example: 'example@procuraiq.com',
    description: 'User email address',
  })
  @IsEmail()
  @Transform(({ value }) =>
    String(value).trim().toLowerCase(),
  )
  email!: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Password hash of the user',
    maxLength: 250,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  passwordHash!: string;

  @ApiProperty({
    example: 'ABC',
    description: 'User first name',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({
    example: 'MNO',
    description: 'User last name',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName!: string;
}