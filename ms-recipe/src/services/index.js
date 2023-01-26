import { recipeRepository } from '../database';
import { makeRecipeServices } from './recipe.service';

export const recipeServices = makeRecipeServices({ recipeRepository });
