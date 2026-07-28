
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
import { PaginationDto } from '../../common/base/dto/pagination.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
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
        summary: 'Get user by id',
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