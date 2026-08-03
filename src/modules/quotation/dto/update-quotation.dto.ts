import {
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateQuotationDto {

    @IsOptional()
    @IsString()
    remarks?: string;
}