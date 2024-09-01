import { IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class MergeVideosDto {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  videoIds: number[];
}