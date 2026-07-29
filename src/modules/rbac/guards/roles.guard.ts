import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../../core/database/prisma.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
    ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );

        if ( !requiredRoles || requiredRoles.length === 0 ) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        if (!user) {
            return false;
        }

        const userRoles = await this.prisma.userRole.findMany({
            where: {
                userId: user.userId,
            },

            include: {
                role: true,
            },
        });

        const assignedRoles = userRoles.map(
            (userRole) => userRole.role.name,
        );

        return requiredRoles.some((role) =>
            assignedRoles.includes(role),
        );
    }
}