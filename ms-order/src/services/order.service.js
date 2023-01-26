import { OrderStatus } from '../utils/enums';

export function makeOrderServices({ orderRepository }) {
  return function orderServices() {
    async function createNewOrder({ recipe, kafkaOrderStorageProducer }) {
      try {
        const { _id: recipeId } = recipe;
        const orderDto = {
          recipeId,
        };
        const order = await orderRepository.createOrder(orderDto);
        const message = { order, recipe };
        await kafkaOrderStorageProducer({ message });
        return { success: true, data: order };
      } catch (error) {
        return { success: false, error };
      }
    }
    async function getAllOrders() {
      try {
        const orders = await orderRepository.getAllOrders();
        return { success: true, data: orders };
      } catch (error) {
        return { success: false, error };
      }
    }
    async function getOrderById(id) {
      try {
        const data = await orderRepository.findRecipeById(id);
        return { success: true, data };
      } catch (error) {
        return { success: false, error };
      }
    }
    async function updateServedOrder({ order }) {
      try {
        const { _id } = order;
        const data = await orderRepository
          .updateOrderStatus({ _id, status: OrderStatus.FINISHED });
        return { success: true, data };
      } catch (error) {
        return { success: false, error };
      }
    }
    return {
      createNewOrder,
      getAllOrders,
      getOrderById,
      updateServedOrder,
    };
  };
}
