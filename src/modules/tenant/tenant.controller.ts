import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Tenant')
@Controller({
    path: 'tenants',
    version: '1',
})
export class TenantController {

    constructor(
        private readonly tenantService: TenantService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create tenant',
        description:
            'Creates a new tenant in the platform.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Tenant created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid tenant payload.',
    })
    create(
        @Body()
        dto: CreateTenantDto,
    ) {
        return this.tenantService.createTenant(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get all tenants',
        description:
            'Retrieves paginated list of tenants.',
    })
    @ApiQuery({
        name: 'page',
        required: false,
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        example: 10,
    })
    @ApiResponse({
        status: 200,
        description:
            'Tenants retrieved successfully.',
    })
    findAll(
        @Query()
        query: PaginationDto,
    ) {
        return this.tenantService.getTenants(
            query.page,
            query.limit,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get tenant by ID',
        description:
            'Retrieves tenant details.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Tenant identifier',
        example:
            'bc7f4ec4-d4be-4469-9cf6-c0eea9a61eac',
    })
    @ApiResponse({
        status: 200,
        description:
            'Tenant retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Tenant not found.',
    })
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.tenantService.getTenant(
            id,
        );
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Update tenant',
        description:
            'Updates tenant information.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Tenant identifier',
        example:
            'bc7f4ec4-d4be-4469-9cf6-c0eea9a61eac',
    })
    @ApiResponse({
        status: 200,
        description:
            'Tenant updated successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Tenant not found.',
    })
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateTenantDto,
    ) {
        return this.tenantService.updateTenant(
            id,
            dto,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete tenant',
        description:
            'Soft deletes a tenant.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Tenant identifier',
        example:
            'bc7f4ec4-d4be-4469-9cf6-c0eea9a61eac',
    })
    @ApiResponse({
        status: 200,
        description:
            'Tenant deleted successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Tenant not found.',
    })
    remove(
        @Param('id')
        id: string,
    ) {
        return this.tenantService.deleteTenant(
            id,
        );
    }
}