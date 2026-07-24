import { PrismaService } from '../../core/database/prisma.service';

import {
  PaginationOptions,
  PaginationResult,
} from './pagination.types';

export abstract class BaseRepository {
    constructor(
        protected readonly prisma: PrismaService,
    ) {}

    protected async paginate<T>(
        model: {
            findMany: Function;
            count: Function;
        },
        options: PaginationOptions,
        where?: Record<string, unknown>,
        orderBy?: Record<string, unknown>,
    ): Promise<PaginationResult<T>> {

        const page = options.page ?? 1;
        const limit = options.limit ?? 10;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            model.findMany({
                where,
                skip,
                take: limit,
                orderBy,
            }),

            model.count({
                where,
            }),
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    protected async exists(
        model: {
            count: Function;
        },
        where: Record<string, unknown>,
    ): Promise<boolean> {
        const count = await model.count({
            where,
        });

        return count > 0;
    }

    protected async count(
        model: {
            count: Function;
        },
        where?: Record<string, unknown>,
    ): Promise<number> {
        return model.count({
            where,
        });
    }

    protected async softDelete(
        model: {
            update: Function;
        },
        id: string,
        deletedBy?: string,
    ) {
        return model.update({
            where: {
                id,
            },

            data: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy,
            },
        });
    }

    protected async restore(
        model: {
            update: Function;
        },
        id: string,
    ) {
        return model.update({
            where: {
                id,
            },

            data: {
                isDeleted: false,
                deletedAt: null,
                deletedBy: null,
            },
        });
    }
}