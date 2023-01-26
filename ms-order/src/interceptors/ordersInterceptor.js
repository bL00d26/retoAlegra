export default function makeOrdersInterceptor({ orderServices }) {
  return async function ordersInterceptor() {
    const { success, data, error } = await orderServices().getAllOrders();
    if (!success) {
      return {
        success,
        error,
      };
    }
    return {
      success,
      data,
    };
  };
}
