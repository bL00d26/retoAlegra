export default function makeIngredientInterceptor({ storageServices }) {
  return async function ingredientInterceptor(id) {
    try {
      const { success, data } = await storageServices().getIngredientById(id);
      return {
        success,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };
}
