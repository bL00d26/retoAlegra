import { getMissingIngredients, buyMissingIngredients } from './storage.utils';

export function makeStorageServices({ storageRepository, buyRecordRepository }) {
  return function storageServices() {
    async function getIngredients() {
      try {
        const ingredients = await storageRepository.getIngredients();
        return { success: true, data: ingredients };
      } catch (error) {
        return { success: false, error };
      }
    }
    async function getBuyRecords() {
      try {
        const buyRecords = await buyRecordRepository.getBuyRecords();
        return { success: true, data: buyRecords };
      } catch (error) {
        console.log(error);
        return { success: false, error };
      }
    }
    async function executeOrder({ data, id }) {
      console.log(`Ejecutando orden número ${id} en la cola`);
      const { recipe } = data;
      const { ingredients: recipeIngredients } = recipe;
      const ids = recipeIngredients.map(
        ({ ingredient }) => ingredient,
      );
      const ingredientsFromDb = await storageRepository.getRecipeIngredients(ids);
      const missingIngredients = getMissingIngredients({ recipeIngredients, ingredientsFromDb });
      if (missingIngredients.length) {
        // eslint-disable-next-line max-len
        const { boughtIngredients, buyRecords } = await buyMissingIngredients({ missingIngredients });
        const newBuyRecords = await buyRecordRepository.createBuyRecords(buyRecords);
        await storageRepository
          .editBoughtStock({ boughtIngredients, ingredientsFromDb });
        console.log('Compra de ingredientes faltantes finalizada, cocinando la orden');
        const newIngredientStock = await storageRepository.makeOrder({ recipeIngredients });
        return {
          success: true, data: { newIngredientStock, newBuyRecords },
        };
      }
      const newIngredientStock = await storageRepository
        .makeOrder({ recipeIngredients, ingredientsFromDb });
      return { success: true, data: { newIngredientStock } };
    }
    async function getIngredientById(id) {
      try {
        const data = await storageRepository.findIngredientById(id);
        return { success: true, data };
      } catch (error) {
        return { success: false, error };
      }
    }
    async function getBuyRecordById(id) {
      try {
        const data = await buyRecordRepository.findBuyRecordById(id);
        return { success: true, data };
      } catch (error) {
        return { success: false, error };
      }
    }
    function makeCompletedOrder({ kafkaStorageOrderProducer }) {
      return async function completedOrder({ data, returnvalue }) {
        const { recipe, order } = data;
        const { data: { newIngredientStock, newBuyRecords } } = returnvalue;
        console.log('Orden realizada, enviando al cliente');
        await kafkaStorageOrderProducer({
          message: {
            recipe, order, newIngredientStock, newBuyRecords,
          },
        });
      };
    }
    return {
      getIngredients,
      getBuyRecords,
      getIngredientById,
      getBuyRecordById,
      executeOrder,
      makeCompletedOrder,
    };
  };
}
