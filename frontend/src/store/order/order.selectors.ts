import { createSelector } from 'reselect';
import { RootState } from '../store';
import { Order } from './interfaces/order.interface';

const ordersSelector = (state: RootState) => state.orders.orders;

const sortByDate = (a: Order, b: Order) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export const pendingOrdersSelector = createSelector(ordersSelector, (orders) =>
  orders.filter(({ status }) => status === 'PENDING').sort(sortByDate)
);
export const finishedOrdersSelector = createSelector(ordersSelector, (orders) =>
  orders.filter(({ status }) => status === 'FINISHED').sort(sortByDate)
);
