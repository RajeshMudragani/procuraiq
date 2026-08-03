import { PartialType } from '@nestjs/swagger';

import { CreateAwardItemDto }
from './create-award-item.dto';

export class UpdateAwardItemDto
    extends PartialType(
        CreateAwardItemDto,
    ) {}