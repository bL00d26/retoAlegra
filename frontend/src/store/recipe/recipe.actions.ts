import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MS_RECIPE_URL } from '../constants';
import { Recipe } from './interfaces/recipe.interface';

// eslint-disable-next-line import/prefer-default-export
export const loadRecipesAction = createAsyncThunk<Recipe[]>(
  'recipe/loadRecipes',
  async () => {
    const { data } = await axios.get(MS_RECIPE_URL.concat('recipes/'));
    return data.data;
  }
);
