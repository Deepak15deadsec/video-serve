import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { TrimVideoDto } from './dto/trim-video.dto';
import { MergeVideosDto } from './dto/merge-videos.dto';
import { ShareVideoDto } from './dto/share-video.dto';
import { SharedLink } from './entities/shared-link.entity';

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video)
        private videoRepository: Repository<Video>,
        @InjectRepository(SharedLink)
        private sharedLinkRepository: Repository<SharedLink>,
    ) { }

    async uploadVideo(createVideoDto: CreateVideoDto): Promise<Video> {
        if (!createVideoDto.filename || !createVideoDto.filepath) {
            throw new BadRequestException('Filename and filepath are required');
        }

        const video = this.videoRepository.create(createVideoDto);
        return this.videoRepository.save(video);
    }

    async trimVideo(trimVideoDto: TrimVideoDto): Promise<Video> {
        const video = await this.videoRepository.findOne({ where: { id: trimVideoDto.id } });
        if (!video) {
            throw new NotFoundException('Video not found');
        }

        if (trimVideoDto.start < 0 || trimVideoDto.end > video.duration || trimVideoDto.start >= trimVideoDto.end) {
            throw new BadRequestException('Invalid start or end time for trimming');
        }

        try {
            const trimmedDuration = trimVideoDto.end - trimVideoDto.start;
            video.duration = trimmedDuration;
            // Optionally, update the video's size or other properties after trimming
            return await this.videoRepository.save(video);
        } catch (error) {
            throw new BadRequestException('Error trimming video');
        }
    }

    async mergeVideos(mergeVideosDto: MergeVideosDto): Promise<Video> {
        if (!mergeVideosDto.videoIds || mergeVideosDto.videoIds.length < 2) {
            throw new BadRequestException('At least two videos are required for merging');
        }

        const videos = await this.videoRepository.find({
            where: mergeVideosDto.videoIds.map(id => ({ id })),
        });

        if (videos.length !== mergeVideosDto.videoIds.length) {
            throw new NotFoundException('Some videos not found for merging');
        }

        try {
            // Logic to merge videos and create a new video entity
            const mergedVideo = new Video();
            mergedVideo.filename = 'merged_video.mp4';
            mergedVideo.duration = videos.reduce((acc, video) => acc + video.duration, 0);
            mergedVideo.size = videos.reduce((acc, video) => acc + video.size, 0);

            return await this.videoRepository.save(mergedVideo);
        } catch (error) {
            throw new BadRequestException('Error merging videos');
        }
    }

    async shareVideo(shareVideoDto: ShareVideoDto): Promise<SharedLink> {
        const video = await this.videoRepository.findOne({ where: { id: shareVideoDto.videoId } });
        if (!video) {
          throw new NotFoundException('Video not found');
        }
      
        const expiresAt = new Date(shareVideoDto.expiresAt);
        if (isNaN(expiresAt.getTime()) || expiresAt <= new Date()) {
          throw new BadRequestException('Invalid expiration date');
        }
      
        try {
          const sharedLink = this.sharedLinkRepository.create({
            video,
            token: Math.random().toString(36).substring(2, 15),
            expiresAt,
          });
      
          return await this.sharedLinkRepository.save(sharedLink);
        } catch (error) {
          throw new BadRequestException('Error creating shared link');
        }
      }
}
