import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {

    async validate(
        payload: JwtPayload,
    ) {
        return {
            userId: payload.sub,
            tenantId: payload.tenantId,
            email: payload.email,
        };
    }
}