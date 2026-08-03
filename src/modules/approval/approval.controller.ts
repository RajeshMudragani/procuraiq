import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ApprovalService } from './approval.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { ApproveDto } from './dto/approve.dto';
import { RejectDto } from './dto/reject.dto';

@ApiTags('Approvals')
@Controller('approvals')
export class ApprovalController {

    constructor(
        private readonly service: ApprovalService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateApprovalDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get(':id')
    findById(
        @Param('id')
        id: string,
    ) {
        return this.service.findById(
            id,
        );
    }

    @Post(':id/approve')
    approve(
        @Param('id')
        id: string,

        @Body()
        dto: ApproveDto,
    ) {
        return this.service.approve(
            id,
            dto,
        );
    }

    @Post(':id/reject')
    reject(
        @Param('id')
        id: string,

        @Body()
        dto: RejectDto,
    ) {
        return this.service.reject(
            id,
            dto,
        );
    }
}