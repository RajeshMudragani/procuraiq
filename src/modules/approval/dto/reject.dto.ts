import {
    IsOptional,
    IsString,
} from 'class-validator';

export class RejectDto {

    @IsString()
    approverId!: string;

    @IsOptional()
    @IsString()
    comments?: string;
}