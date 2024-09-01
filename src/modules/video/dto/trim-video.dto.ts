import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class TrimVideoDto {
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @Min(0)
  start: number;

  @IsNumber()
  @Min(0)
  end: number;
}