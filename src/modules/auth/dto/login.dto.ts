import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'bf1fcc1b-ea4c-4feb-8904-7579b89751c8',
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
