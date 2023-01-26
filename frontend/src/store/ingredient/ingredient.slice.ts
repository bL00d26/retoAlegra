/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from './interfaces/ingredient.interface';
import {
  loadBuyRecordsAction,
  loadIngredientsAction,
} from './ingredient.actions';
import { BuyRecord } from './interfaces/buyRecord.interface';

export interface IngredientState {
  ingredients: Ingredient[];
  buyRecords: BuyRecord[];
}

const initialState: IngredientState = {
  ingredients: [] as Ingredient[],
  buyRecords: [] as BuyRecord[],
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    updateStockIngredients: (
      state,
      action: PayloadAction<{ newIngredientStock: Ingredient[] }>
    ) => {
      const { newIngredientStock } = action.payload;
      state.ingredients = state.ingredients.map((ingredient) => {
        const newIngredient = newIngredientStock.find(
          ({ _id }) => _id === ingredient._id
        );
        return newIngredient as Ingredient;
      });
    },
    updateBuyRecords: (
      state,
      action: PayloadAction<{ newBuyRecords: BuyRecord[] }>
    ) => {
      const { newBuyRecords } = action.payload;
      state.buyRecords = [...newBuyRecords, ...state.buyRecords];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadIngredientsAction.fulfilled, (state, { payload }) => {
      state.ingredients = payload;
    });
    builder.addCase(loadIngredientsAction.rejected, (state) => {
      state.ingredients = [];
    });

    builder.addCase(loadBuyRecordsAction.fulfilled, (state, { payload }) => {
      state.buyRecords = payload;
    });
    builder.addCase(loadBuyRecordsAction.rejected, (state) => {
      state.buyRecords = [];
    });
  },
});

export const { updateStockIngredients, updateBuyRecords } =
  ingredientSlice.actions;

export default ingredientSlice.reducer;
