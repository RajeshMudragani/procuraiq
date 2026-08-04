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

import {
    LoginRateLimit,
    RefreshRateLimit,
} from '../../core/rate-limit/decorators/rate-limit.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    @ApiOperation({
        summary: 'Register a new user',
        description:
            'Creates a new user within a tenant.',
    })
    @ApiResponse({
        status: 201,
        description:
            'User registered successfully.',
        schema: {
            example: {
                id: 'user-001',
                email: 'rajesh@example.com',
                tenantId: 'tenant-001',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid registration payload.',
    })
    @ApiResponse({
        status: 409,
        description:
            'User already exists.',
    })
    register(
        @Body()
        dto: RegisterDto,
    ) {
        return this.authService.register(
            dto,
        );
    }

    @Post('login')
    @LoginRateLimit()
    @ApiOperation({
        summary: 'Authenticate user',
        description:
            'Authenticates a user and returns access and refresh tokens.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Login successful.',
        schema: {
            example: {
                accessToken:
                    'eyJhbGciOiJSUzI1NiIs...',
                refreshToken:
                    'eyJhbGciOiJSUzI1NiIs...',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid login request.',
    })
    @ApiResponse({
        status: 401,
        description:
            'Invalid credentials.',
    })
    login(
        @Body()
        dto: LoginDto,
    ) {
        return this.authService.login(
            dto,
        );
    }

    @Post('refresh')
    @RefreshRateLimit()
    @ApiOperation({
        summary: 'Refresh access token',
        description:
            'Generates a new access token using a valid refresh token.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Access token refreshed successfully.',
        schema: {
            example: {
                accessToken:
                    'eyJhbGciOiJSUzI1NiIs...',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid refresh token request.',
    })
    @ApiResponse({
        status: 401,
        description:
            'Refresh token is invalid or expired.',
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
        description:
            'Revokes the supplied refresh token.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Logged out successfully.',
        schema: {
            example: {
                success: true,
            },
        },
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid logout request.',
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
        description:
            'Returns details of the currently authenticated user.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Current user details.',
        schema: {
            example: {
                id: 'user-001',
                email: 'rajesh@example.com',
                tenantId: 'tenant-001',
                roles: [
                    'ADMIN',
                ],
            },
        },
    })
    @ApiResponse({
        status: 401,
        description:
            'Unauthorized.',
    })
    me(
        @CurrentUser()
        user: any,
    ) {
        return user;
    }
}