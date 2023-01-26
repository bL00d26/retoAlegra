import { OrderModel } from '../models/order.model';

import '../models/recipe.model';

export function OrderRepository() {
  async function createOrder(newOrderDto) {
    const order = new OrderModel(newOrderDto);
    const newOrder = await order.save();
    const populatedOrder = await newOrder.populate('recipeId');
    return populatedOrder;
  }

  async function getAllOrders() {
    const orders = await OrderModel.find({}).populate('recipeId');
    return orders;
  }

  async function findOrderById(id) {
    const order = await OrderModel.findById(id).populate('recipeId');
    return order;
  }

  async function updateOrderStatus({ _id, status }) {
    const order = await OrderModel.findByIdAndUpdate(_id, { status }, { new: true }).populate('recipeId');
    return order;
  }
  return {
    createOrder,
    getAllOrders,
    findOrderById,
    updateOrderStatus,
  };
}
