import { BuyRecordModel } from '../models/buyRecord.model';

export function BuyRecordRepository() {
  async function createBuyRecord(newBuyRecordDto) {
    const newBuyRecord = new BuyRecordModel(newBuyRecordDto);
    const buyRecord = await newBuyRecord.save();
    const populatedBuyRecord = await buyRecord.populate('ingredientId');
    return populatedBuyRecord;
  }

  async function createBuyRecords(buyRecords) {
    const filteredBuyRecords = buyRecords.filter(({ quantitySold }) => quantitySold !== 0);
    const newBuyRecords = await BuyRecordModel.insertMany(filteredBuyRecords);
    // eslint-disable-next-line no-underscore-dangle
    const ids = newBuyRecords.map((record) => record._id.toString());
    const populatedRecords = await BuyRecordModel.find({
      _id: { $in: ids },
    }).populate('ingredientId');
    return populatedRecords;
  }

  async function getBuyRecords() {
    const buyRecords = await BuyRecordModel.find({}).populate('ingredientId');
    return buyRecords;
  }

  async function findBuyRecordById(id) {
    const buyRecord = await BuyRecordModel.findById(id).populate('ingredientId');
    return buyRecord;
  }

  return {
    createBuyRecord,
    createBuyRecords,
    getBuyRecords,
    findBuyRecordById,
  };
}
