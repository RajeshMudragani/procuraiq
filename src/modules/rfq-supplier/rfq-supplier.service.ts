import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EventsService } from '../../core/events/events.service';
import { RoutingKeys } from '../../core/events/contracts/common/routing-keys';
import { CreateRfqSupplierDto } from './dto/create-rfq-supplier.dto';
import { UpdateRfqSupplierDto } from './dto/update-rfq-supplier.dto';
import { RfqSupplierStatus } from './enums/rfq-supplier-status.enum';
import { RfqSupplierRepository } from './rfq-supplier.repository';

@Injectable()
export class RfqSupplierService {

    constructor(
        private readonly repository: RfqSupplierRepository,
        private readonly eventsService: EventsService,
    ) {}

    async create(
        dto: CreateRfqSupplierDto,
    ) {

        const supplier =
            await this.repository.create({
                rfqId:
                    dto.rfqId,

                supplierId:
                    dto.supplierId,

                status:
                    RfqSupplierStatus.INVITED,
            });

        await this.eventsService.publish(
            RoutingKeys.RFQ_SUPPLIER_INVITED,
            {
                eventType:
                    RoutingKeys.RFQ_SUPPLIER_INVITED,

                rfqId:
                    supplier.rfqId,

                supplierId:
                    supplier.supplierId,
            },
        );

        return supplier;
    }

    findAll() {
        return this.repository.findAll();
    }

    async findById(
        id: string,
    ) {

        const supplier =
            await this.repository.findById(
                id,
            );

        if (!supplier) {
            throw new NotFoundException(
                'RFQ Supplier not found',
            );
        }

        return supplier;
    }

    findByRfq(
        rfqId: string,
    ) {
        return this.repository.findByRfq(
            rfqId,
        );
    }

    update(
        id: string,
        dto: UpdateRfqSupplierDto,
    ) {
        return this.repository.update(
            id,
            {
                status:
                    dto.status,

                respondedAt:
                    new Date(),
            },
        );
    }

    delete(
        id: string,
    ) {
        return this.repository.delete(
            id,
        );
    }
}