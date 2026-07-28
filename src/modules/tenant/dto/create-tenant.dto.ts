import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    example: 'ABC Corporation',
    description: 'Display name of the tenant',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'abc',
    description: 'Unique tenant code used throughout the system',
    maxLength: 50,
  })
  @Transform(({ value }) =>
    String(value).trim(),
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code!: string;
}
