import { Ingredient } from './ingredient.interface';

export interface BuyRecord {
  quantitySold: number;
  ingredientId: Ingredient;
  createdAt: string;
  updatedAt: string;
}
