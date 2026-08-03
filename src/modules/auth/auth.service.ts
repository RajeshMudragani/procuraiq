import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../core/database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SigningKeyService } from './signing-key/signing-key.service';
import { JwtKeyResolverService } from './services/jwt-key-resolver.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly signingKeyService: SigningKeyService,
        private readonly jwtKeyResolverService: JwtKeyResolverService,
    ) {}

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                tenantId: dto.tenantId,
                email: dto.email,
                isDeleted: false,
            },
        });

        if (existingUser) {
            throw new ConflictException(
                'User already exists',
            );
        }

        const passwordHash = await bcrypt.hash(
            dto.password,
            12,
        );

        const user = await this.prisma.user.create({
            data: {
                tenantId: dto.tenantId,
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                passwordHash,
            },
        });

        return user;
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                tenantId: dto.tenantId,
                email: dto.email,
                isDeleted: false,
            },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!user.passwordHash) {
            throw new UnauthorizedException(
                'Password not configured',
            );
        }

        const validPassword = await bcrypt.compare(
            dto.password,
            user.passwordHash,
        );

        if (!validPassword) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.id,
            tenantId: user.tenantId,
            email: user.email,
        };

        const accessToken = await this.generateAccessToken(
                payload,
            );

        const refreshToken = await this.generateRefreshToken(
                payload,
            );


        const refreshTokenHash =
        await bcrypt.hash(
            refreshToken,
            12,
        );

        await this.prisma.userSession.create({
            data: {
                userId: user.id,

                refreshTokenHash,

                expiresAt: new Date(
                Date.now() +
                    7 * 24 * 60 * 60 * 1000,
                ),
            },
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refresh(
        refreshToken: string,
    ) {
        const payload = await this.jwtKeyResolverService.verifyToken(
                refreshToken,
            );

        const sessions =
        await this.prisma.userSession.findMany({
            where: {
                userId: payload.sub,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });

        let validSession: typeof sessions[number] | null = null;

        for (const session of sessions) {
        const matched =
            await bcrypt.compare(
                refreshToken,
                session.refreshTokenHash,
            );

            if (matched) {
                validSession = session;
                break;
            }
        }

        if (!validSession) {
            throw new UnauthorizedException(
                'Invalid refresh token',
            );
        }

        await this.prisma.userSession.delete({
            where: {
                id: validSession.id,
            },
        });

        const accessToken = await this.generateAccessToken({
                sub: payload.sub,
                tenantId: payload.tenantId,
                email: payload.email,
            });

        const newRefreshToken = await this.generateRefreshToken({
                sub: payload.sub,
                tenantId: payload.tenantId,
                email: payload.email,
            });

        const refreshTokenHash = await bcrypt.hash(
                newRefreshToken,
                12,
            );

        await this.prisma.userSession.create({
            data: {
                userId: payload.sub,
                refreshTokenHash,
                expiresAt: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000,
                ),
            },
        });

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }

    async logout(
        refreshToken: string,
    ) {
        const payload = await this.jwtKeyResolverService.verifyToken(
                refreshToken,
            );

        const sessions = await this.prisma.userSession.findMany({
                where: {
                    userId: payload.sub,
                },
            });

        for (const session of sessions) {
            const matched = await bcrypt.compare(
                    refreshToken,
                    session.refreshTokenHash,
                );

            if (matched) {
                await this.prisma.userSession.delete({
                    where: {
                        id: session.id,
                    },
                });

                break;
            }
        }

        return {
            message: 'Logged out successfully',
        };
    }

    private async generateAccessToken(
        payload: Record<string, unknown>,
    ): Promise<string> {

        const key = await this.signingKeyService.getActiveKey();

        try {
            return await this.jwtService.signAsync(
                payload,
                {
                    algorithm: 'RS256',
                    privateKey: key.privateKey,
                    keyid: key.kid,
                    expiresIn: '15m',
                },
            );
        } catch (error) {
            console.error('JWT SIGN ERROR', error);
            throw error;
        }
    }

    private async generateRefreshToken(
        payload: Record<string, unknown>,
    ): Promise<string> {

        const key = await this.signingKeyService.getActiveKey();

        return this.jwtService.signAsync(
            payload,
            {
                algorithm: 'RS256',
                privateKey: key.privateKey,
                keyid: key.kid,
                expiresIn: '7d',
            },
        );
    }
}