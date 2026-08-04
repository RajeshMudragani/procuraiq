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

import { UserRoleService } from './user-role.service';
import { AssignRoleDto } from './dto/assign-role.dto';

@ApiTags('User Role')
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
        description:
            'Assigns a role to a user.',
    })
    @ApiResponse({
        status: 201,
        description:
            'Role assigned successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid assignment request.',
    })
    @ApiResponse({
        status: 409,
        description:
            'Role already assigned to user.',
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
        description:
            'Retrieves all roles assigned to a user.',
    })
    @ApiParam({
        name: 'userId',
        description:
            'User identifier',
        example:
            'user-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'User roles retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'User not found.',
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
        description:
            'Removes a role assignment from a user.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Role removed successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'User-role assignment not found.',
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
