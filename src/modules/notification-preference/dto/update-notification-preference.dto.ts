import {
    ApiProperty,
} from '@nestjs/swagger';

export class UpdateNotificationPreferenceDto {
    @ApiProperty({
        example: true,
    })
    emailEnabled!: boolean;

    @ApiProperty({
        example: true,
    })
    inAppEnabled!: boolean;
}