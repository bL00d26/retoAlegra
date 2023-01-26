import { IngredientModel } from '../models/ingredient.model';

export function StorageRepository() {
  async function createIngredient(newIngredientDto) {
    const newIngredient = new IngredientModel(newIngredientDto);
    return newIngredient.save();
  }

  async function getIngredients() {
    const ingredients = await IngredientModel.find({});
    return ingredients;
  }
  async function getRecipeIngredients(ids) {
    const ingredients = await IngredientModel.find({
      _id: { $in: ids },
    });
    return ingredients;
  }
  async function findIngredientById(id) {
    const ingredient = await IngredientModel.findById(id);
    return ingredient;
  }
  async function editBoughtStock({ boughtIngredients, ingredientsFromDb }) {
    const writeOperations = boughtIngredients.map(({ ingredientId, boughtQuantity }) => {
      const { stock } = ingredientsFromDb.find(({ _id }) => _id.toString() === ingredientId);
      return {
        updateOne: {
          filter: { _id: ingredientId },
          update: { stock: boughtQuantity + stock },
        },
      };
    });
    const result = await IngredientModel.bulkWrite(writeOperations);
    return result;
  }
  async function makeOrder({ recipeIngredients, ingredientsFromDb = null }) {
    const ids = recipeIngredients.map(({ ingredient }) => ingredient);
    let ingredients;
    if (!ingredientsFromDb) {
      ingredients = await IngredientModel.find({
        _id: { $in: ids },
      });
    } else {
      ingredients = ingredientsFromDb;
    }
    const writeOperations = ingredients.map(({ _id, stock }) => {
      const { quantity } = recipeIngredients.find(
        ({ ingredient }) => ingredient === _id.toString(),
      );
      if (stock - quantity < 0) {
        throw new Error('Cantidad inválida al actualizar stock');
      }
      return {
        updateOne: {
          filter: { _id: _id.toString() },
          update: { stock: stock - quantity },
        },
      };
    });
    await IngredientModel.bulkWrite(writeOperations);
    const newIngredientStock = await IngredientModel.find({});
    return newIngredientStock;
  }

  return {
    createIngredient,
    getIngredients,
    getRecipeIngredients,
    findIngredientById,
    makeOrder,
    editBoughtStock,
  };
}
