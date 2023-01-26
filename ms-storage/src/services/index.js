import { storageRepository, buyRecordRepository } from '../database';
import { makeStorageServices } from './storage.service';

export const storageServices = makeStorageServices({ storageRepository, buyRecordRepository });
