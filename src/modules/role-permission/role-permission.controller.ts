import {
    Body,
    Controller,
    Delete,
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

import { RolePermissionService } from './role-permission.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@ApiTags('Role Permission')
@Controller({
    path: 'role-permissions',
    version: '1',
})
export class RolePermissionController {

    constructor(
        private readonly rolePermissionService: RolePermissionService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Assign permission to role',
        description:
            'Assigns a permission to a role.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Permission assigned successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid assignment request.',
    })
    @ApiResponse({
        status: 409,
        description:
            'Permission already assigned to role.',
    })
    assignPermission(
        @Body()
        dto: AssignPermissionDto,
    ) {
        return this.rolePermissionService.assignPermission(
            dto,
        );
    }

    @Get(':roleId')
    @ApiOperation({
        summary: 'Get role permissions',
        description:
            'Retrieves all permissions assigned to a role.',
    })
    @ApiParam({
        name: 'roleId',
        description:
            'Role identifier',
        example:
            'role-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'Role permissions retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Role not found.',
    })
    getRolePermissions(
        @Param('roleId')
        roleId: string,
    ) {
        return this.rolePermissionService.getRolePermissions(
            roleId,
        );
    }

    @Delete()
    @ApiOperation({
        summary: 'Remove permission from role',
        description:
            'Removes a permission assignment from a role.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Permission removed successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Role-permission assignment not found.',
    })
    removePermission(
        @Body()
        dto: AssignPermissionDto,
    ) {
        return this.rolePermissionService.removePermission(
            dto,
        );
    }
}