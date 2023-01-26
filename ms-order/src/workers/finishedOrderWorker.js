export function makeFinishedOrderWorker({ orderServices }) {
  return function injectedFinishedOrderWorker({ io }) {
    return async function finishedOrderWorker({ message }) {
      const {
        order, recipe, newIngredientStock, newBuyRecords,
      } = JSON.parse(message.value.toString());
      const { _id: orderId } = order;
      const { name: recipeName } = recipe;
      console.log(`Orden servida, actualizando el estado de la orden ${JSON.stringify({ orderId, recipeName })}`);
      const { success, data, error } = await orderServices().updateServedOrder({ order });
      if (!success) {
        console.log(error);
        return;
      }

      io.emit('orderUpdate', { order: data });
      io.emit('ingredientsUpdate', { newIngredientStock });
      if (newBuyRecords) {
        io.emit('newBuyRecords', { newBuyRecords });
      }
      return { success: true, order };
    };
  };
}
