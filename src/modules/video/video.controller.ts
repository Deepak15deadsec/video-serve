import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { TrimVideoDto } from './dto/trim-video.dto';
import { MergeVideosDto } from './dto/merge-videos.dto';
import { ShareVideoDto } from './dto/share-video.dto';

@Controller('videos')
// @UseGuards(AuthGuard)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  uploadVideo(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.uploadVideo(createVideoDto);
  }

  @Post('trim')
  trimVideo(@Body() trimVideoDto: TrimVideoDto) {
    return this.videoService.trimVideo(trimVideoDto);
  }

  @Post('merge')
  mergeVideos(@Body() mergeVideosDto: MergeVideosDto) {
    return this.videoService.mergeVideos(mergeVideosDto);
  }

  @Post('share')
  shareVideo(@Body() shareVideoDto: ShareVideoDto) {
    return this.videoService.shareVideo(shareVideoDto);
  }
}