import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @Transform(({ value }) =>
    String(value).trim(),
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code!: string;
}
