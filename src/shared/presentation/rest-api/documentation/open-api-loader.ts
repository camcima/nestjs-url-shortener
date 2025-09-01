import type { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';

export function loadSwaggerForNestjsApp(app: INestApplication): void {
  const documentBuilder = (): OpenAPIObject => {
    const options = new DocumentBuilder()
      .setTitle('Shorten URL API')
      .setVersion('1.0.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Authentication to the API is performed via Bearer authentication. Provide your token as the bearer value.',
      })
      .build();

    const document = SwaggerModule.createDocument(app, options);

    return document;
  };

  SwaggerModule.setup('/openapi', app, documentBuilder(), {
    customSiteTitle: 'Shorten URL API',
    jsonDocumentUrl: '/openapi.json',
    swaggerOptions: {
      filter: true,
      displayRequestDuration: true,
      withCredentials: true,
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 10,
      defaultModelRendering: 'model',
    },
  });
}
