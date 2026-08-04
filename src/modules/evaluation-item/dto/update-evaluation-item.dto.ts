import { PartialType } from '@nestjs/swagger';

import { CreateEvaluationItemDto } from './create-evaluation-item.dto';

export class UpdateEvaluationItemDto
    extends PartialType(
        CreateEvaluationItemDto,
    ) {}
