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

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Tenants')
@Controller({
  path: 'tenants',
  version: '1',
})
export class TenantController {
    constructor(
        private readonly tenantService: TenantService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant' })
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
        summary: 'Get tenant by id',
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
        summary: 'Soft delete tenant',
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