import {
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateAwardDto {

    @IsOptional()
    @IsString()
    remarks?: string;
}