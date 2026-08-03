import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { PurchaseOrderService } from './purchase-order.service';

@ApiTags('Purchase Orders')
@Controller('purchase-orders')
export class PurchaseOrderController {

    constructor(
        private readonly service: PurchaseOrderService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreatePurchaseOrderDto,
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

    @Post(':id/issue')
    issue(
        @Param('id')
        id: string,
    ) {
        return this.service.issue(
            id,
        );
    }

    @Post(':id/approve')
    approve(
        @Param('id')
        id: string,
    ) {
        return this.service.approve(
            id,
        );
    }

    @Post(':id/close')
    close(
        @Param('id')
        id: string,
    ) {
        return this.service.close(
            id,
        );
    }
}