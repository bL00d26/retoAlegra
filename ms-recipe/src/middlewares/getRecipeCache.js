export function makeGetRecipeCache({ redisCache }) {
  return async function getRecipeCache(req, res, next) {
    const { id } = req.params;
    const cachedValue = await redisCache.getRedisCache({ key: `recipe/${id}` });
    if (cachedValue) {
      return res.status(200).json({
        success: true,
        data: cachedValue,
      });
    }
    next();
  };
}
