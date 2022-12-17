import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['http://localhost:15672'],
      queue: 'billing-queue',
      noAck: false,
      persistent: true,
    },
  })
  await app.listen(3000);
}
bootstrap();
