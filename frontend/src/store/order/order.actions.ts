import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MS_ORDER_URL } from '../constants';
import { Order } from './interfaces/order.interface';

export const loadOrdersAction = createAsyncThunk<Order[]>(
  'order/loadOrders',
  async () => {
    const { data } = await axios.get(MS_ORDER_URL.concat('orders/'));
    return data.data;
  }
);
export const newOrderAction = createAsyncThunk<string>(
  'order/newOrder',
  async () => {
    const { data } = await axios.get(MS_ORDER_URL.concat('newOrder/'));
    return data.data;
  }
);
