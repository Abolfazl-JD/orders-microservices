import { RMQService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get(RMQService)
  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions('BILLING'))
  await app.startAllMicroservices();
}
bootstrap();
