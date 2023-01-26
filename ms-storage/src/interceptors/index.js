import { storageServices } from '../services';
import makeIngredientsInterceptor from './ingredientsInterceptor';
import makeIngredientInterceptor from './ingredientInterceptor';
import makeBuyRecordsInterceptor from './buyRecordsInterceptor';
import makeBuyRecordInterceptor from './buyRecordInterceptor';

export const ingredientsInterceptor = makeIngredientsInterceptor({ storageServices });
export const ingredientInterceptor = makeIngredientInterceptor({ storageServices });
export const buyRecordsInterceptor = makeBuyRecordsInterceptor({ storageServices });
export const buyRecordInterceptor = makeBuyRecordInterceptor({ storageServices });
