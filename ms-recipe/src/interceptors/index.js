import { redisCache } from '../middlewares';
import { recipeServices } from '../services';
import makeGetRecipesInterceptor from './getRecipesInterceptor';
import makeGetRecipeByIdInterceptor from './getRecipeByIdInterceptor';

export const getRecipesInterceptor = makeGetRecipesInterceptor({ recipeServices, redisCache });
// eslint-disable-next-line max-len
export const getRecipeByIdInterceptor = makeGetRecipeByIdInterceptor({ recipeServices, redisCache });
