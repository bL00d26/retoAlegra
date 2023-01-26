import makeRedisCache from './redisCache';
import { redisClient } from '../redis';
import { makeGetRecipesCache } from './getRecipesCache';
import { makeGetRecipeCache } from './getRecipeCache';

export const redisCache = makeRedisCache({ redisClient });

export const getRecipesCache = makeGetRecipesCache({ redisCache });
export const getRecipeCache = makeGetRecipeCache({ redisCache });
