import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { SigningKeyRepository } from './signing-key.repository';
import { CreateSigningKeyDto } from './dto/create-signing-key.dto';
import { generateKeyPairSync } from 'crypto';

@Injectable()
export class SigningKeyService {
    constructor(
        private readonly repository: SigningKeyRepository,
    ) {}

    async createKey(
        dto: CreateSigningKeyDto,
    ) {
        if (dto.isActive) {
            await this.repository.deactivateAll();
        }

        return this.repository.create({
            kid: dto.kid,
            algorithm: dto.algorithm,
            publicKey: dto.publicKey,
            privateKey: dto.privateKey,
            isActive: dto.isActive ?? false,
            activatedAt: dto.isActive
                ? new Date()
                : null,
        });
    }

    async getActiveKey() {
        const key =
            await this.repository.findActive();

        if (!key) {
            throw new NotFoundException(
                'No active signing key found',
            );
        }

        return key;
    }

    async findByKid(
        kid: string,
    ) {
        const key =
            await this.repository.findByKid(
                kid,
            );

        if (!key) {
            throw new NotFoundException(
                `Signing key ${kid} not found`,
            );
        }

        return key;
    }

    async activateKey(
        id: string,
    ) {
        await this.repository.deactivateAll();

        return this.repository.update(id, {
            isActive: true,
            activatedAt: new Date(),
        });
    }

    async getAll() {
        return this.repository.findAll();
    }
    
    private generateKeyPair() {
        const {
            publicKey,
            privateKey,
        } = generateKeyPairSync(
            'rsa',
            {
                modulusLength: 2048,

                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem',
                },

                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                },
            },
        );

        return {
            publicKey,
            privateKey,
        };
    }

    async rotateKey() {

        const keys = this.generateKeyPair();
        await this.repository.deactivateAll();

        const expiresAt = new Date();

        expiresAt.setDate(
            expiresAt.getDate() + 90,
        );

        const newKey = await this.repository.create({
                kid: `procuraiq-${Date.now()}`,
                algorithm: 'RS256',
                publicKey: keys.publicKey,
                privateKey: keys.privateKey,
                isActive: true,
                activatedAt: new Date(),
                expiresAt,
            });

        return {
            kid: newKey.kid,
            expiresAt,
        };
    }
}