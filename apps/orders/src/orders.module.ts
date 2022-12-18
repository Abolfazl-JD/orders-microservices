import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import * as Joi from 'joi'
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from '@app/common';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env'
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    RMQModule.register({
      name : BILLING_SERVICE
    }),
    DatabaseModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
