import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtKeyResolverService } from '../services/jwt-key-resolver.service';

@Injectable()
export class JwtAuthGuard
    implements CanActivate
{
    constructor(
        private readonly jwtResolver: JwtKeyResolverService,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException();
        }

        const token = authHeader.replace(
                'Bearer ',
                '',
            );

        const payload = await this.jwtResolver.verifyToken(
                token,
            );

        request.user = payload;

        return true;
    }
}