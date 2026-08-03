import {
    IsBoolean,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateSigningKeyDto {
    @IsString()
    kid!: string;

    @IsString()
    algorithm!: string;

    @IsString()
    publicKey!: string;

    @IsString()
    privateKey!: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}