import makeNewOrderWorker from './newOrderWorker';
import { storageQueue } from '../queue';

export const newOrderWorker = makeNewOrderWorker({ storageQueue });
