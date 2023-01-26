import { createSelector } from 'reselect';
import { RootState } from '../store';
import { BuyRecord } from './interfaces/buyRecord.interface';

const sortByDateBuyRecord = (a: BuyRecord, b: BuyRecord) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export const ingredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;

const disdorderBuyRecordsSelector = (state: RootState) =>
  state.ingredients.buyRecords;
export const buyRecordsSelector = createSelector(
  disdorderBuyRecordsSelector,
  (buyRecords) => [...buyRecords].sort(sortByDateBuyRecord)
);
