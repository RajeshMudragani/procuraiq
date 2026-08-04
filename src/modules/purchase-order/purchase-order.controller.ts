import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { PurchaseOrderService } from './purchase-order.service';
import { SubmitPoForApprovalDto } from './dto/submit-po-for-approval.dto';

@ApiTags('Purchase Order')
@Controller('purchase-orders')
export class PurchaseOrderController {

    constructor(
        private readonly service: PurchaseOrderService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create purchase order',
        description:
            'Creates a new purchase order from an awarded supplier.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Purchase order created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid purchase order payload.',
    })
    create(
        @Body()
        dto: CreatePurchaseOrderDto,
    ) {
        return this.service.create(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all purchase orders',
        description:
            'Retrieves all purchase orders.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Purchase orders retrieved successfully.',
    })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get purchase order by ID',
        description:
            'Retrieves purchase order details including order items.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Purchase order identifier',
        example:
            'po-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Purchase order retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Purchase order not found.',
    })
    findById(
        @Param('id')
        id: string,
    ) {
        return this.service.findById(
            id,
        );
    }

    @Post(':id/issue')
    @ApiOperation({
        summary: 'Issue purchase order',
        description:
            'Issues the purchase order to the supplier.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Purchase order identifier',
        example:
            'po-001',
    })
    @ApiResponse({
        status: 201,
        description:
            'Purchase order issued successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Purchase order already issued or invalid state.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Purchase order not found.',
    })
    issue(
        @Param('id')
        id: string,
    ) {
        return this.service.issue(
            id,
        );
    }

    @Post(':id/approve')
    @ApiOperation({
        summary: 'Approve purchase order',
        description:
            'Approves the purchase order for processing.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Purchase order identifier',
        example:
            'po-001',
    })
    @ApiResponse({
        status: 201,
        description:
            'Purchase order approved successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Purchase order already approved or invalid state.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Purchase order not found.',
    })
    approve(
        @Param('id')
        id: string,
    ) {
        return this.service.approve(
            id,
        );
    }

    @Post(':id/close')
    @ApiOperation({
        summary: 'Close purchase order',
        description:
            'Closes the purchase order after fulfilment.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Purchase order identifier',
        example:
            'po-001',
    })
    @ApiResponse({
        status: 201,
        description:
            'Purchase order closed successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Purchase order cannot be closed in current state.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Purchase order not found.',
    })
    close(
        @Param('id')
        id: string,
    ) {
        return this.service.close(
            id,
        );
    }

    @Post(':id/submit-for-approval')
    submitForApproval(
        @Param('id')
        id: string,

        @Body()
        dto: SubmitPoForApprovalDto,
    ) {
        return this.service.submitForApproval(
            id,
            dto,
        );
    }
}