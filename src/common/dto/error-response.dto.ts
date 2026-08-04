import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {

    @ApiProperty({
        example: false,
    })
    success!: boolean;

    @ApiProperty({
        example: 'HTTP_EXCEPTION',
    })
    code!: string;

    @ApiProperty({
        example: 'RFQ not found',
    })
    message!: string;

    @ApiProperty({
        nullable: true,
    })
    details?: any;

    @ApiProperty({
        example: '/api/rfqs/123',
    })
    path!: string;

    @ApiProperty({
        example: '2026-08-04T13:00:00.000Z',
    })
    timestamp!: string;
}