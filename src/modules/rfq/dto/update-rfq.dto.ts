import {
    IsDateString,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateRfqDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    currency?: string;

    @IsOptional()
    @IsDateString()
    submissionDeadline?: Date;
}