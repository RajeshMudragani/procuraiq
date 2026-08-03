import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'e356b2f4-c726-4835-9e2a-db359fb6ec26',
    description: 'Tenant ID',
  })
  @IsString()
  tenantId!: string;

  @ApiProperty({
    example: 'example@procuraiq.com',
    description: 'User email',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'User password',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
