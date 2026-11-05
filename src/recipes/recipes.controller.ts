import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateRecipeDto } from './dto/create-recipe.dto.js';
import { RecipesService } from './recipes.service.js';

interface UploadedFileMetadata {
  path?: string;
  filename?: string;
  [key: string]: any;
}

interface MulterFiles {
  imageUrl?: UploadedFileMetadata[];
  videoUrl?: UploadedFileMetadata[];
}

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageUrl', maxCount: 1 },
      { name: 'videoUrl', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFiles() files: MulterFiles,
  ) {
  
    console.log('RECEIVED FILES:', files);
    console.log('RECEIVED BODY:', createRecipeDto);

    const recipeData = {
      ...createRecipeDto,
      imageUrl: files?.imageUrl?.[0]?.path || files?.imageUrl?.[0]?.filename || null,
      videoUrl: files?.videoUrl?.[0]?.path || files?.videoUrl?.[0]?.filename || null,
    };

    return await this.recipesService.create(recipeData);
  }

  @Get()
  async findAll() {
    return await this.recipesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recipesService.findOne(id);
  }
}