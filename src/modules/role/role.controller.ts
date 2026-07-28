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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from '../../common/base/dto/pagination.dto';

import { RoleService } from './role.service';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create role',
    })
    @ApiResponse({
        status: 201,
        description:
        'Role created successfully',
    })
    @ApiResponse({
        status: 409,
        description:
        'Role already exists',
    })
    create(
        @Body()
        dto: CreateRoleDto,
    ) {
        return this.roleService.createRole(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get roles',
    })
    findAll(
        @Query()
        query: PaginationDto,
    ) {
        return this.roleService.getRoles(
            query.page,
            query.limit,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get role by id',
    })
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.roleService.getRole(
            id,
        );
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Update role',
    })
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto,
    ) {
        return this.roleService.updateRole(
            id,
            dto,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete role',
    })
    remove(
        @Param('id')
        id: string,
    ) {
        return this.roleService.deleteRole(
            id,
        );
    }
}
