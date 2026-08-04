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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller({
    path: 'users',
    version: '1',
})
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Create user',
        description:
            'Creates a new user within a tenant.',
    })
    @ApiResponse({
        status: 201,
        description:
            'User created successfully.',
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid user payload.',
    })
    @ApiResponse({
        status: 409,
        description:
            'User already exists.',
    })
    create(
        @Body()
        dto: CreateUserDto,
    ) {
        return this.userService.createUser(
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get users',
        description:
            'Retrieves a paginated list of users.',
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
            'Users retrieved successfully.',
    })
    findAll(
        @Query()
        query: PaginationDto,
    ) {
        return this.userService.getUsers(
            query.page,
            query.limit,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get user by ID',
        description:
            'Retrieves user details.',
    })
    @ApiParam({
        name: 'id',
        description:
            'User identifier',
        example:
            'user-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'User retrieved successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'User not found.',
    })
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.userService.getUser(
            id,
        );
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Update user',
        description:
            'Updates user information.',
    })
    @ApiParam({
        name: 'id',
        description:
            'User identifier',
        example:
            'user-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'User updated successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'User not found.',
    })
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateUserDto,
    ) {
        return this.userService.updateUser(
            id,
            dto,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete user',
        description:
            'Soft deletes a user.',
    })
    @ApiParam({
        name: 'id',
        description:
            'User identifier',
        example:
            'user-001',
    })
    @ApiResponse({
        status: 200,
        description:
            'User deleted successfully.',
    })
    @ApiResponse({
        status: 404,
        description:
            'User not found.',
    })
    remove(
        @Param('id')
        id: string,
    ) {
        return this.userService.deleteUser(
            id,
        );
    }
}