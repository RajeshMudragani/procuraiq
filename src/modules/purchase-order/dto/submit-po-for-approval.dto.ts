import {
    IsArray,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class ApprovalStepDto {

    @IsNumber()
    stepNumber!: number;

    @IsString()
    approverId!: string;
}

export class SubmitPoForApprovalDto {

    @IsString()
    requestedBy!: string;

    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(
        () => ApprovalStepDto,
    )
    steps!: ApprovalStepDto[];
}