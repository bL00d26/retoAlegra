import makeNewRecipeWorker from './newRecipeWorker';
import { orderServices } from '../services';
import { makeFinishedOrderWorker } from './finishedOrderWorker';

export const newRecipeWorker = makeNewRecipeWorker({ orderServices });
export const finishedOrderWorker = makeFinishedOrderWorker({ orderServices });
