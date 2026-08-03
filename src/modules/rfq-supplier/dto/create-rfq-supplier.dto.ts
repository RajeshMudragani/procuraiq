import {
    IsString,
} from 'class-validator';

export class CreateRfqSupplierDto {

    @IsString()
    rfqId!: string;

    @IsString()
    supplierId!: string;
}