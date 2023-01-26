import mongoose from 'mongoose';
import { BuyRecordRepository } from './repository/buyRecord.repository';
import { StorageRepository } from './repository/storage.repository';

export async function databaseConnection() {
  try {
    const {
      MONGO_DB_URI = 'mongodb://db/restaurant',
    } = process.env;
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db running');
  } catch (error) {
    console.log(`Error connecting to db ${error}`);
  }
}

export const storageRepository = StorageRepository();
export const buyRecordRepository = BuyRecordRepository();
