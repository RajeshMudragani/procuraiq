import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AwardItemRepository {

    constructor(
        private readonly prisma:
            PrismaService,
    ) {}

    createMany(
        data: any[],
    ) {
        return this.prisma.awardItem.createMany({
            data,
        });
    }

    findByAward(
        awardId: string,
    ) {
        return this.prisma.awardItem.findMany({
            where: {
                awardId,
            },
        });
    }
}