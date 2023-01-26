import { Recipe } from '../../recipe/interfaces/recipe.interface';

export interface Order {
  _id: string;
  recipeId: Recipe;
  status: string;
  createdAt: string;
  updatedAt: string;
}
