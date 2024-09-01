// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { VideoModule } from './modules/video/video.module';
import { DatabaseModule } from './database/database.module';
import { Video } from './modules/video/entities/video.entity';
import { SharedLink } from './modules/video/entities/shared-link.entity';

@Module({
  imports: [    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Video, SharedLink],
    synchronize: true,
  }),
  AuthModule, VideoModule, DatabaseModule],
})
export class AppModule {}