import {
    ApiProperty,
} from '@nestjs/swagger';

export class SendEmailDto {
    @ApiProperty()
    to!: string;

    @ApiProperty()
    subject!: string;

    @ApiProperty()
    html!: string;
}