import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'tenant-123',
  })
  @IsString()
  tenantId!: string;

  @ApiProperty({
    example: 'admin@procuraiq.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Rajesh',
  })
  @IsString()
  firstName!: string;

  @ApiProperty({
    example: 'Mudragani',
  })
  @IsString()
  lastName!: string;

  @ApiProperty({
    example: 'Password@123',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}