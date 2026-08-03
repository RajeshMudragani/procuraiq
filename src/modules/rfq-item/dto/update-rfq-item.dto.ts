import { PartialType } from '@nestjs/swagger';

import { CreateRfqItemDto } from './create-rfq-item.dto';

export class UpdateRfqItemDto
    extends PartialType(
        CreateRfqItemDto,
    ) {}