import { RecipeModel } from '../models/recipe.model';

import '../models/ingredient.model';

export function RecipeRepository() {
  async function createRecipe(newRecipeDto) {
    const newRecipe = new RecipeModel(newRecipeDto);
    return newRecipe.save();
  }

  async function getRandomRecipe() {
    const recipes = await RecipeModel.find();
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    return randomRecipe;
  }

  async function findRecipeById(id) {
    const recipe = await RecipeModel.findById(id);
    return recipe;
  }
  async function getRecipes() {
    const recipes = await RecipeModel.find().populate('ingredients.ingredient');
    return recipes;
  }
  return {
    createRecipe,
    getRandomRecipe,
    findRecipeById,
    getRecipes,
  };
}
