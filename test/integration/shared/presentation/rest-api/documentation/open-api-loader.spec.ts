import { INestApplication, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { loadSwaggerForNestjsApp } from '../../../../../../src/shared/presentation/rest-api/documentation/open-api-loader';

@Module({})
class DummyModule {}

describe('loadSwaggerForNestjsApp', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [DummyModule],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  it('should create a OpenAPI Swagger UI documentation at GET /openapi', async () => {
    loadSwaggerForNestjsApp(app);

    const res = await request(app.getHttpServer()).get('/openapi').expect(200);

    expect(app).toBeDefined();
    expect(res.type).toBe('text/html');
  });

  it('should create a OpenAPI specification at GET /openapi.json', async () => {
    loadSwaggerForNestjsApp(app);

    const res = await request(app.getHttpServer())
      .get('/openapi.json')
      .expect(200);

    expect(app).toBeDefined();
    expect(res.type).toBe('application/json');
  });
});
