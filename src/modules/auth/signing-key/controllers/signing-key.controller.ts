import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { SigningKeyService } from '../signing-key.service';

@Controller('internal/signing-keys')
export class SigningKeyController {
    constructor(
        private readonly signingKeyService: SigningKeyService,
    ) {}

    @Get()
    getAll() {
        return this.signingKeyService.getAll();
    }

    @Post('rotate')
    rotate() {
        return this.signingKeyService.rotateKey();
    }

    @Patch(':id/activate')
    activate(
        @Param('id')
        id: string,
    ) {
        return this.signingKeyService.activateKey(
            id,
        );
    }
}