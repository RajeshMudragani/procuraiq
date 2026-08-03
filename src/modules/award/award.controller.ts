import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateAwardDto } from './dto/create-award.dto';
import { AwardService } from './award.service';

@ApiTags('Awards')
@Controller('awards')
export class AwardController {

    constructor(
        private readonly service:
            AwardService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateAwardDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get()
    findAll() {
        return this.service.findAll();
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

    @Post(':id/award')
    award(
        @Param('id')
        id: string,
    ) {
        return this.service.award(
            id,
        );
    }

    @Post(':id/cancel')
    cancel(
        @Param('id')
        id: string,
    ) {
        return this.service.cancel(
            id,
        );
    }
}