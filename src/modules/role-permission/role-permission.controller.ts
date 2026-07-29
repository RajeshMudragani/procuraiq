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
  ApiTags,
} from '@nestjs/swagger';

import { RolePermissionService } from './role-permission.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@ApiTags('Role Permissions')
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