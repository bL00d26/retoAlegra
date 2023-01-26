import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MS_STORAGE_URL } from '../constants';
import { BuyRecord } from './interfaces/buyRecord.interface';
import { Ingredient } from './interfaces/ingredient.interface';

export const loadIngredientsAction = createAsyncThunk<Ingredient[]>(
  'ingredient/loadIngredients',
  async () => {
    const { data } = await axios.get(MS_STORAGE_URL.concat('ingredients/'));
    return data.data;
  }
);

export const loadBuyRecordsAction = createAsyncThunk<BuyRecord[]>(
  'ingredient/loadBuyRecords',
  async () => {
    const { data } = await axios.get(MS_STORAGE_URL.concat('buyRecords/'));
    return data.data;
  }
);
