/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Order } from './interfaces/order.interface';
import { loadOrdersAction, newOrderAction } from './order.actions';

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [] as Order[],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrders: (state, action: PayloadAction<{ order: Order }>) => {
      const { order } = action.payload;
      state.orders = state.orders.map((item) =>
        // eslint-disable-next-line no-underscore-dangle
        item._id === order._id ? order : item
      );
    },
    newOrder: (state, action: PayloadAction<{ order: Order }>) => {
      const { order } = action.payload;
      state.orders = [...state.orders, order];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadOrdersAction.fulfilled, (state, { payload }) => {
      state.orders = payload;
    });
    builder.addCase(loadOrdersAction.rejected, (state) => {
      state.orders = [];
    });
    builder.addCase(newOrderAction.fulfilled, (state) => {
      toast('Orden creada con éxito');
    });
    builder.addCase(newOrderAction.rejected, (state) => {
      toast.error('Error al crear la orden');
    });
  },
});

export const { updateOrders, newOrder } = orderSlice.actions;

export default orderSlice.reducer;
