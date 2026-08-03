import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../core/database/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigningKeyModule } from './signing-key/signing-key.module';
import { JwtKeyResolverService } from './services/jwt-key-resolver.service';

@Module({
    imports: [
        PrismaModule,

        SigningKeyModule,

        JwtModule.register({}),
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        JwtKeyResolverService,
    ],

    exports: [
        AuthService,
        JwtModule,
        JwtKeyResolverService,
    ],
})
export class AuthModule {}