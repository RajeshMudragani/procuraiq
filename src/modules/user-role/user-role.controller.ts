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

import { UserRoleService } from './user-role.service';
import { AssignRoleDto } from './dto/assign-role.dto';

@ApiTags('User Roles')
@Controller({
    path: 'user-roles',
    version: '1',
})
export class UserRoleController {
    constructor(
        private readonly userRoleService: UserRoleService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Assign role to user',
    })
    assignRole(
        @Body()
        dto: AssignRoleDto,
    ) {
        return this.userRoleService.assignRole(
            dto,
        );
    }

    @Get(':userId')
    @ApiOperation({
        summary: 'Get user roles',
    })
    getUserRoles(
        @Param('userId')
        userId: string,
    ) {
        return this.userRoleService.getUserRoles(
            userId,
        );
    }

    @Delete()
    @ApiOperation({
        summary: 'Remove role from user',
    })
    removeRole(
        @Body()
        dto: AssignRoleDto,
    ) {
        return this.userRoleService.removeRole(
            dto,
        );
    }
}