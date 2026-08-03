import {
    IsEnum,
} from 'class-validator';

import { RfqSupplierStatus } from '../enums/rfq-supplier-status.enum';

export class UpdateRfqSupplierDto {

    @IsEnum(
        RfqSupplierStatus,
    )
    status!: RfqSupplierStatus;
}