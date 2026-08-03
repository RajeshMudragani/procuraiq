import { Module } from '@nestjs/common';

import { PrismaModule } from '../../../core/database/prisma.module';

import { SigningKeyRepository } from './signing-key.repository';
import { SigningKeyService } from './signing-key.service';

import { SigningKeyController } from './controllers/signing-key.controller';
import { JwksController } from './controllers/jwks.controller';

@Module({
    imports: [
        PrismaModule,
    ],

    controllers: [
        SigningKeyController,
        JwksController,
    ],

    providers: [
        SigningKeyRepository,
        SigningKeyService,
    ],

    exports: [
        SigningKeyService,
    ],
})
export class SigningKeyModule {}