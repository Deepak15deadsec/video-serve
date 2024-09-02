import { Controller, Post, Body, UseGuards, BadRequestException, NotFoundException} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { TrimVideoDto } from './dto/trim-video.dto';
import { MergeVideosDto } from './dto/merge-videos.dto';
import { ShareVideoDto } from './dto/share-video.dto';

@Controller('videos')
// @UseGuards(AuthGuard) // Uncomment and configure if using authentication
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  async uploadVideo(@Body() createVideoDto: CreateVideoDto) {
    try {
      return await this.videoService.uploadVideo(createVideoDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error; // Re-throw other exceptions
    }
  }

  @Post('trim')
  async trimVideo(@Body() trimVideoDto: TrimVideoDto) {
    try {
      return await this.videoService.trimVideo(trimVideoDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error; // Re-throw other exceptions
    }
  }

  @Post('merge')
  async mergeVideos(@Body() mergeVideosDto: MergeVideosDto) {
    try {
      return await this.videoService.mergeVideos(mergeVideosDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error; // Re-throw other exceptions
    }
  }

  @Post('share')
  async shareVideo(@Body() shareVideoDto: ShareVideoDto) {
    try {
      return await this.videoService.shareVideo(shareVideoDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error; // Re-throw other exceptions
    }
  }
}
