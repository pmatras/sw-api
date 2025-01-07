import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const bootstrapSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('SW API')
    .setDescription('API for managing SW characters')
    .setVersion('v1')
    .addServer('http://localhost:3000/', 'LOCAL API server')
    .addTag('SW')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api-docs', app, documentFactory, {
    jsonDocumentUrl: '/api-docs/json',
    yamlDocumentUrl: '/api-docs/yaml',
  });
};
