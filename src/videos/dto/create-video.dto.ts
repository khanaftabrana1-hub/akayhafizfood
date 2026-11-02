import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;

  @IsUrl()
  @IsOptional()
  thumbnailUrl: string;
}