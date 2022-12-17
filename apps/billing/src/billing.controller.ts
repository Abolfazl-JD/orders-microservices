import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderDocument } from '../../orders/src/order.schema';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @EventPattern('order-created')
  handleOrderCreated(@Payload() data: OrderDocument) {
    console.log(data)
    return data
  }
}
