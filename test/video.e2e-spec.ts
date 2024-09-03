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
      .send({ filename: 'test.mp4', filepath: '/uploads/test.mp4', duration: 15, size: 1000000 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.filename).toBe('test.mp4');
      });
  });

  it('/videos/trim (POST)', () => {
    return request(app.getHttpServer())
      .post('/videos/trim')
      .send({ id: 1, start: 0, end: 10 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('duration', 10);
      });
  });

  it('/videos/merge (POST)', () => {
    return request(app.getHttpServer())
      .post('/videos/merge')
      .send({ videoIds: [1, 2] })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('filename', 'merged_video.mp4');
      });
  });

  it('/videos/share (POST)', () => {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour from now
    return request(app.getHttpServer())
      .post('/videos/share')
      .send({ videoId: 1, expiresAt })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('expiresAt', expiresAt);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
