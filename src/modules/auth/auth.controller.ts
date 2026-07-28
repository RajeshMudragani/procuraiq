import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    @ApiOperation({
        summary: 'Register a new user',
        description: 'Creates a new user within a tenant',
    })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully',
    })
    @ApiResponse({
        status: 409,
        description: 'User already exists',
    })
    register(
        @Body()
        dto: RegisterDto,
    ) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiOperation({
        summary: 'Authenticate user',
        description: 'Authenticates a user and returns access and refresh tokens',
    })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        schema: {
        example: {
            accessToken: 'eyJ...',
            refreshToken: 'eyJ...',
        },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials',
    })
    login(
        @Body()
        dto: LoginDto,
    ) {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @ApiOperation({
        summary: 'Refresh access token',
    })
    @ApiResponse({
        status: 200,
        description: 'Access token refreshed',
        schema: {
            example: {
                accessToken: 'eyJ...',
            },
        },
    })
    refresh(
        @Body()
        dto: RefreshTokenDto,
    ) {
        return this.authService.refresh(
            dto.refreshToken,
        );
    }

    @Post('logout')
    @ApiOperation({
        summary: 'Logout user',
    })
    @ApiResponse({
        status: 200,
        description: 'Logged out successfully',
    })
    logout(
        @Body()
        dto: RefreshTokenDto,
    ) {
        return this.authService.logout(
            dto.refreshToken,
        );
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get current authenticated user',
    })
    @ApiResponse({
        status: 200,
        description: 'Current user details',
    })
    me(
        @CurrentUser()
        user: any,
    ) {
        return user;
    }
}