import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class ShareVideoDto {
  @IsNotEmpty()
  @IsNumber()
  videoId: number;

  @IsDateString()
  expiresAt: string;
}