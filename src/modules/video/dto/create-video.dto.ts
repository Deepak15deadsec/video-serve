import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  @IsString()
  filepath: string;  // Add this field if it's required

  @IsNumber()
  @Min(5)
  @Max(25)
  duration: number;

  @IsNumber()
  @Max(26214400) // 25 MB in bytes
  size: number;
}