import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from './order/order.slice';
import ingredientsReducer from './ingredient/ingredient.slice';
import recipesSlice from './recipe/recipe.slice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    ingredients: ingredientsReducer,
    recipes: recipesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
