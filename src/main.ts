import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { bootstrapSwagger } from '../bootstrap-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('/api');

  app.use(helmet());

  app.enableShutdownHooks();

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.enableVersioning({ type: VersioningType.URI });

  bootstrapSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

process.on('unhandledRejection', () => {});
