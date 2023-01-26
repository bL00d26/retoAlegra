export function makeGetRecipesCache({ redisCache }) {
  return async function getRecipesCache(req, res, next) {
    const cachedValue = await redisCache.getRedisCache({ key: 'recipes' });
    if (cachedValue) {
      return res.status(200).json({
        success: true,
        data: cachedValue,
      });
    }
    next();
  };
}
