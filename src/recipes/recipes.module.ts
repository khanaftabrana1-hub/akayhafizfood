import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Recipe } from './entities/recipe.entity.js';
import { RecipesController } from './recipes.controller.js';
import { RecipesService } from './recipes.service.js';

import { CloudinaryService } from '../cloudinary/cloudinary.service.js'; 

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Recipe]),
    
  
  ],
  controllers: [RecipesController],
  providers: [
    RecipesService,
    CloudinaryService, // Cloudinary service ko yahan register kiya hai
  ],
  exports: [RecipesService],
})
export class RecipesModule {}