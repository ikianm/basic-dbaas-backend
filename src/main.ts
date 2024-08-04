import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from 'configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(
    parseInt(AppConfig().port),
    AppConfig().host
  );
}
bootstrap();
