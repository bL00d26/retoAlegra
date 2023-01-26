import { RecipeIngredient } from './recipe-ingredient.interface';

export interface Recipe {
  _id: string;
  name: string;
  ingredients: RecipeIngredient[];
  createdAt: string;
  updatedAt: string;
}
