import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // <-- Yeh import karein
import { AppModule } from './app.module.js';
import { TransformInterceptor } from './common/transform.interceptor.js';
import { AllExceptionsFilter } from './common/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 3000;
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();