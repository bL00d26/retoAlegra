import { Ingredient } from '../../ingredient/interfaces/ingredient.interface';

export interface RecipeIngredient {
  _id: string;
  ingredient: Ingredient;
  quantity: number;
}
