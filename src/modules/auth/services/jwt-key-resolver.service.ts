import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SigningKeyService } from '../signing-key/signing-key.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtKeyResolverService {
    constructor(
        private readonly signingKeyService: SigningKeyService,
    ) {}

    async verifyToken(
        token: string,
    ): Promise<JwtPayload> {
        const decoded = jwt.decode(
            token,
            {
                complete: true,
            },
        ) as jwt.Jwt;

        if (
            !decoded ||
            !decoded.header?.kid
        ) {
            throw new UnauthorizedException(
                'Invalid token',
            );
        }

        const key = await this.signingKeyService.findByKid(
                decoded.header.kid,
            );

        const payload = jwt.verify(
            token,
            key.publicKey,
            {
                algorithms: [
                    'RS256',
                ],
            },
        );

        if (
            typeof payload !== 'object' ||
                !payload.sub ||
                !payload.tenantId ||
                !payload.email
        ) {
            throw new UnauthorizedException(
                'Invalid token payload',
            );
        }

        return payload as JwtPayload;
    }
}