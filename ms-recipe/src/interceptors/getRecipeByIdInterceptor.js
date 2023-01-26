export default function makeGetRecipeByIdInterceptor({ recipeServices, redisCache }) {
  return async function getRecipeByIdInterceptor(id) {
    const { success, data, error } = await recipeServices().getRecipeById(id);
    if (!success) {
      return {
        success,
        error,
      };
    }
    const { _id = '' } = data;
    await redisCache.setRedisCache({ key: `recipe/${_id}`, value: data });
    return {
      success,
      data,
    };
  };
}
