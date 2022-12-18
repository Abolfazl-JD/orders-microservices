import { RMQService } from '@app/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrderDocument } from '../../orders/src/order.schema';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RMQService
  ) { }


  @EventPattern('order-created')
  handleOrderCreated(@Payload() data: OrderDocument, @Ctx() context: RmqContext) {
    this.billingService.bill(data)
    this.rmqService.ack(context)
  }
}
