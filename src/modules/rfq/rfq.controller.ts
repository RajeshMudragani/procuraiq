import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateRfqDto } from './dto/create-rfq.dto';
import { UpdateRfqDto } from './dto/update-rfq.dto';
import { RfqService } from './rfq.service';

@ApiTags('RFQs')
@Controller('rfqs')
export class RfqController {
    constructor(
        private readonly rfqService:
            RfqService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateRfqDto,
    ) {
        return this.rfqService.create(
            dto,
        );
    }

    @Get()
    findAll() {
        return this.rfqService.findAll();
    }

    @Get(':id')
    findById(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.findById(
            id,
        );
    }

    @Patch(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRfqDto,
    ) {
        return this.rfqService.update(
            id,
            dto,
        );
    }

    @Post(':id/publish')
    publish(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.publish(
            id,
        );
    }

    @Post(':id/close')
    close(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.close(
            id,
        );
    }

    @Post(':id/cancel')
    cancel(
        @Param('id')
        id: string,
    ) {
        return this.rfqService.cancel(
            id,
        );
    }
}