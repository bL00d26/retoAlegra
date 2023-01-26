/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Recipe } from './interfaces/recipe.interface';
import { loadRecipesAction } from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [] as Recipe[],
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadRecipesAction.fulfilled, (state, { payload }) => {
      state.recipes = payload;
    });
    builder.addCase(loadRecipesAction.rejected, (state) => {
      state.recipes = [];
    });
  },
});

export default recipeSlice.reducer;
