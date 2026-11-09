import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js'; // Import Cloudinary service

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly cloudinaryService: CloudinaryService, // Cloudinary service injected here
  ) {}

  async create(createRecipeDto: any): Promise<Recipe> {
    const recipe = this.recipeRepository.create(createRecipeDto);
    const savedRecipe = await this.recipeRepository.save(recipe);
    return Array.isArray(savedRecipe) ? savedRecipe[0] : savedRecipe;
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeRepository.find();
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async update(id: string, updateRecipeDto: any): Promise<Recipe> {
    const recipe = await this.findOne(id);

    // Agar nayi image/video aayi hai, toh purani file ko update karte waqt handle kar sakte hain
    Object.assign(recipe, updateRecipeDto);
    return await this.recipeRepository.save(recipe);
  }

  async remove(id: string): Promise<void> {
    const recipe = await this.findOne(id);

    // Optional: Agar aap chahte hain ke recipe delete hone par Cloudinary se bhi image/video delete ho jaye, 
    // toh aap yahan cloudinaryService ka delete method call kar sakte hain agar public_id save ho.

    await this.recipeRepository.remove(recipe);
  }
}