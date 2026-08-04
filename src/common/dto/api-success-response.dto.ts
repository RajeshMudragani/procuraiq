import { ApiProperty } from '@nestjs/swagger';

export class ApiSuccessResponseDto<T> {

    @ApiProperty({
        example: true,
    })
    success!: boolean;

    @ApiProperty()
    data!: T;

    @ApiProperty({
        example:
            '2026-08-04T13:00:00.000Z',
    })
    timestamp!: string;

    @ApiProperty()
    requestId!: string;

    @ApiProperty()
    correlationId!: string;
}