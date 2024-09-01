import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Video } from './entities/video.entity';
import { SharedLink } from './entities/shared-link.entity';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, SharedLink]),
    AuthModule, // Import AuthModule here
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}