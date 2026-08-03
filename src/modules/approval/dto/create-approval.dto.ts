import {
    IsArray,
    IsEnum,
    IsInt,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ApprovalEntityType } from '@prisma/client';

class ApprovalStepDto {
    @IsInt()
    stepNumber!: number;

    @IsString()
    approverId!: string;
}


export class CreateApprovalDto {

    @IsEnum(ApprovalEntityType)
    entityType!: ApprovalEntityType;

    @IsString()
    entityId!: string;

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