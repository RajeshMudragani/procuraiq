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
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from '../../common/dto/pagination.dto';

import { PermissionService } from './permission.service';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('Permissions')
@Controller({
  path: 'permissions',
  version: '1',
})
export class PermissionController {
    constructor(
        private readonly permissionService: PermissionService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create permission',
    })
    create(
        @Body()
        dto: CreatePermissionDto,
    ) {
        return this.permissionService.createPermission(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get permissions',
    })
    findAll(
        @Query()
        query: PaginationDto,
    ) {
        return this.permissionService.getPermissions(
            query.page,
            query.limit,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get permission by id',
    })
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.permissionService.getPermission(
            id,
        );
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Update permission',
    })
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdatePermissionDto,
    ) {
        return this.permissionService.updatePermission(
            id,
            dto,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete permission',
    })
    remove(
        @Param('id')
        id: string,
    ) {
        return this.permissionService.deletePermission(
            id,
        );
    }
}