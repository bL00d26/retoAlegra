import { makeQueue } from './makeQueue';
import { storageServices } from '../services';

const queueWorker = storageServices().executeOrder;
const makeCompletedWorker = storageServices().makeCompletedOrder;
export const storageQueue = makeQueue({ name: 'storageOrder', queueWorker, makeCompletedWorker });
