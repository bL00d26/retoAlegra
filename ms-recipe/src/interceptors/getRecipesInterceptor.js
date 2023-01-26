export default function makeGetRecipesInterceptor({ recipeServices, redisCache }) {
  return async function GetRecipesInterceptor() {
    const { success, data, error } = await recipeServices().getRecipes();
    if (!success) {
      return {
        success,
        error,
      };
    }
    await redisCache.setRedisCache({ key: 'recipes', value: data });
    return {
      success,
      data,
    };
  };
}
