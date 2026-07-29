import { Injectable } from '@nestjs/common';

import * as crypto from 'crypto';

import { IdempotencyRepository } from './idempotency.repository';

@Injectable()
export class IdempotencyService {
    constructor(
        private readonly repository: IdempotencyRepository,
    ) {}

    generateHash(
        payload: unknown,
    ): string {
        return crypto
        .createHash('sha256')
        .update(
            JSON.stringify(payload),
        )
        .digest('hex');
    }

    findByKey(
        key: string,
    ) {
        return this.repository.findByKey(
            key,
        );
    }

    createRecord(
        key: string,
        requestHash: string,
        method: string,
        path: string,
        ) {
            return this.repository.create({
                key,
                requestHash,

                method,
                path,

                status: 'PROCESSING',
            });
        }

    updateResponse(
        id: string,
        response: unknown,
    ) {
        return this.repository.update(id, {
            response: response as object,
            status: 'COMPLETED',
        });
    }
}