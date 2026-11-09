import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateRecipeDto } from './dto/create-recipe.dto.js';
import { RecipesService } from './recipes.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';



interface UploadedFileMetadata {
  path?: string;
  filename?: string;
  buffer?: Buffer; // Memory storage ke liye buffer zaroori hai
  [key: string]: any;
}

interface MulterFiles {
  imageUrl?: UploadedFileMetadata[];
  videoUrl?: UploadedFileMetadata[];
}

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly cloudinaryService: CloudinaryService, // Cloudinary service injected
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageUrl', maxCount: 1 },
        { name: 'videoUrl', maxCount: 1 },
      ],
      { storage: memoryStorage() }, // <--- Local disk ki jagah memory storage lagai hai
    ),
  )
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFiles() files: MulterFiles,
  ) {
    console.log('RECEIVED FILES:', files);
    console.log('RECEIVED BODY:', createRecipeDto);

    let imageUrl = null;
    let videoUrl = null;

    // Agar image di gayi hai toh Cloudinary par upload karein
    if (files?.imageUrl?.[0]) {
      const imageUploadResult = await this.cloudinaryService.uploadFile(files.imageUrl[0] as any);
      imageUrl = imageUploadResult.secure_url;
    }

    // Agar video di gayi hai toh Cloudinary par upload karein
    if (files?.videoUrl?.[0]) {
      const videoUploadResult = await this.cloudinaryService.uploadFile(files.videoUrl[0] as any);
      videoUrl = videoUploadResult.secure_url;
    }

    const recipeData = {
      ...createRecipeDto,
      imageUrl,
      videoUrl,
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