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

import { Cached } from '../../core/cache/decorators/cached.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Role')
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
        description:
            'Creates a new role within a tenant.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Role created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid role payload.',
    })
    @ApiResponse({
        status: 409,
        description:
            'Role already exists.',
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
    @Cached('roles:list')
    @ApiOperation({
        summary: 'Get roles',
        description:
            'Retrieves a paginated list of roles.',
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
            'Roles retrieved successfully.',
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
        summary: 'Get role by ID',
        description:
            'Retrieves role details.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Role identifier',
        example:
            'role-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Role retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Role not found.',
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
        description:
            'Updates role information.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Role identifier',
        example:
            'role-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Role updated successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Role not found.',
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
        description:
            'Soft deletes a role.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Role identifier',
        example:
            'role-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Role deleted successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Role not found.',
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
