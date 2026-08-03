import {
    IsOptional,
    IsString,
} from 'class-validator';

export class ApproveDto {

    @IsString()
    approverId!: string;

    @IsOptional()
    @IsString()
    comments?: string;
}