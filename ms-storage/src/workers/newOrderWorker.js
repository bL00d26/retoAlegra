export default function makeNewOrderWorker({ storageQueue }) {
  return function injectedNewOrderWorker({ kafkaStorageOrderProducer }) {
    return async function newOrderStorageWorker({ message }) {
      console.log('Nueva orden recibida en el almacén');
      const { order, recipe } = JSON.parse(message.value.toString());
      // eslint-disable-next-line no-underscore-dangle
      console.log(`${JSON.stringify({ orderId: order._id, recipe: recipe.name })}`);
      const data = { order, recipe };
      const injectedStorageQueue = storageQueue({ kafkaStorageOrderProducer });
      const { success, error } = await injectedStorageQueue.addToQueue({ data });
      if (!success) {
        console.log(error);
        return;
      }
      console.log('Orden agregada a la cola, verificando stock y ejecutando orden');
    };
  };
}
