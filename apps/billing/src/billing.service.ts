import { Injectable, Logger } from '@nestjs/common';
import { OrderDocument } from 'apps/orders/src/order.schema';

@Injectable()
export class BillingService {

  private readonly logger = new Logger(BillingService.name)

  bill(order: OrderDocument) {
    this.logger.log('handling-creating-order', order)
  }
}
