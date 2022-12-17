import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject("billing") private billingClient: ClientProxy
  ) { }

  async createOrder(orderInfo: CreateOrderDto) {
    const newOrder = await this.orderModel.create(orderInfo)
    // successfully returned
    console.log(newOrder)
    // the problem is here down below
    await lastValueFrom(this.billingClient.emit('order-created', { newOrder }))
    return newOrder
  }

  findOrders() {
    return this.orderModel.find()
  }
}
