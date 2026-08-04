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

import { PaginationDto } from '../../common/dto/pagination.dto';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('Permission')
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
        description:
            'Creates a new permission.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Permission created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid permission payload.',
    })
    @ApiResponse({
        status: 409,
        description:
            'Permission already exists.',
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
        description:
            'Retrieves a paginated list of permissions.',
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
            'Permissions retrieved successfully.',
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
        summary: 'Get permission by ID',
        description:
            'Retrieves permission details.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Permission identifier',
        example:
            'permission-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Permission retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Permission not found.',
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
        description:
            'Updates permission information.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Permission identifier',
        example:
            'permission-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Permission updated successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Permission not found.',
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
        description:
            'Soft deletes a permission.',
    })
    @ApiParam({
        name: 'id',
        description:
            'Permission identifier',
        example:
            'permission-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Permission deleted successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Permission not found.',
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