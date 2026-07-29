import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY = 'cache_key';

export const Cached = (
    key: string,
) =>
    SetMetadata(
        CACHE_KEY,
        key,
    );