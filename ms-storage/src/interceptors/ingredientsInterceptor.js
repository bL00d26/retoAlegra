export default function makeIngredientsInterceptor({ storageServices }) {
  return async function ingredientsInterceptor() {
    try {
      const { success, data } = await storageServices().getIngredients();
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
