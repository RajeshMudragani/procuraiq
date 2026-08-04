import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {

    @ApiProperty({
        example: true,
    })
    success!: boolean;

    @ApiProperty({
        example: 1,
    })
    page!: number;

    @ApiProperty({
        example: 10,
    })
    limit!: number;

    @ApiProperty({
        example: 120,
    })
    total!: number;

    @ApiProperty({
        example: 12,
    })
    totalPages!: number;

    @ApiProperty({
        isArray: true,
    })
    data!: T[];
}