import {
    Injectable,
} from '@nestjs/common';

import { NotificationPreferenceRepository } from './notification-preference.repository';
import { UpdateNotificationPreferenceDto } from './dto/update-notification-preference.dto';

@Injectable()
export class NotificationPreferenceService {
    constructor(
        private readonly repository: NotificationPreferenceRepository,
    ) {}

    async getPreferences(
        userId: string,
    ) {
        const preference = await this.repository.findByUser(
            userId,
        );

        if (preference) {
            return preference;
        }

        return this.repository.upsert(
            userId,
            {
                userId,
                emailEnabled: true,
                inAppEnabled: true,
            },
        );
    }

    updatePreferences(
        userId: string,
        dto: UpdateNotificationPreferenceDto,
    ) {
        return this.repository.upsert(
            userId,
            {
                userId,
                emailEnabled: dto.emailEnabled,
                inAppEnabled: dto.inAppEnabled,
            },
        );
    }
}