import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierService } from './supplier.service';

@ApiTags('Supplier')
@Controller('suppliers')
export class SupplierController {

    constructor(
        private readonly supplierService: SupplierService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create supplier',
        description:
            'Creates a new supplier for the tenant.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Supplier created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid supplier payload.',
    })
    create(
        @Body()
        dto: CreateSupplierDto,
    ) {
        return this.supplierService.create(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all suppliers',
        description:
            'Retrieves all suppliers.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Suppliers retrieved successfully.',
    })
    findAll() {
        return this.supplierService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get supplier by ID',
        description:
            'Retrieves supplier details by identifier.',
    })
    @ApiParam({
        name: 'id',
        description: 'Supplier identifier',
        example:
            'e5b2e0f6-cb9a-4d11-86df-123456789abc',
    })
    @ApiResponse({
        status: 200,
        description:
            'Supplier retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Supplier not found.',
    })
    findById(
        @Param('id')
        id: string,
    ) {
        return this.supplierService.findById(
            id,
        );
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update supplier',
        description:
            'Updates supplier information.',
    })
    @ApiParam({
        name: 'id',
        description: 'Supplier identifier',
        example:
            'e5b2e0f6-cb9a-4d11-86df-123456789abc',
    })
    @ApiResponse({
        status: 200,
        description:
            'Supplier updated successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Supplier not found.',
    })
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateSupplierDto,
    ) {
        return this.supplierService.update(
            id,
            dto,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete supplier',
        description:
            'Deletes supplier from the system.',
    })
    @ApiParam({
        name: 'id',
        description: 'Supplier identifier',
        example:
            'e5b2e0f6-cb9a-4d11-86df-123456789abc',
    })
    @ApiResponse({
        status: 200,
        description:
            'Supplier deleted successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Supplier not found.',
    })
    delete(
        @Param('id')
        id: string,
    ) {
        return this.supplierService.delete(
            id,
        );
    }
}