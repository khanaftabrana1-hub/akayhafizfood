import { IsString, IsNotEmpty, IsOptional, IsUrl, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients: string[];

  @IsUrl()
  @IsOptional()
  imageUrl: string;

  @IsUrl()
  @IsOptional()
  videoUrl: string;
}