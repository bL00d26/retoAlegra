import { recipeServices } from '../services';
import makeNewOrderMessageWorker from './makeNewOrderMessageWorker';

export const newOrderMessageWorker = makeNewOrderMessageWorker({ recipeServices });
