/* eslint-disable import/prefer-default-export */
import { RootState } from '../store';

export const recipesSelector = (state: RootState) => state.recipes.recipes;
