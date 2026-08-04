import {
    IsArray,
    IsInt,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class ApprovalStepDto {

    @IsInt()
    stepNumber!: number;

    @IsString()
    approverId!: string;
}

export class SubmitAwardForApprovalDto {

    @IsString()
    requestedBy!: string;

    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(() => ApprovalStepDto)
    steps!: ApprovalStepDto[];
}
