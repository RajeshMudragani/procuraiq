import {
    Controller,
    Get,
} from '@nestjs/common';

import { SigningKeyService } from '../signing-key.service';

@Controller('.well-known')
export class JwksController {
    constructor(
        private readonly signingKeyService: SigningKeyService,
    ) {}

    @Get('jwks.json')
    async getJwks() {
        const keys =
            await this.signingKeyService.getAll();

        return {
            keys: keys.map(
                key => ({
                    kid: key.kid,

                    alg: key.algorithm,

                    use: 'sig',
                }),
            ),
        };
    }
}