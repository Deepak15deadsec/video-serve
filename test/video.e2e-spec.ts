import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('VideoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/videos/upload (POST)', () => {
    return request(app.getHttpServer())
      .post('/videos/upload')
      .send({ filename: 'test.mp4', duration: 15, size: 1000000 })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});