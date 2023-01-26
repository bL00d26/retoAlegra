export default function makeNewRecipeWorker({ orderServices }) {
  return function injectedNewRecipeWorker({ kafkaOrderStorageProducer }) {
    return function injectedIoNewRecipeWorker({ io }) {
      return async function newRecipeWorker({ message }) {
        const { recipe } = JSON.parse(message.value.toString());
        const { _id, name } = recipe;
        console.log(`Receta aleatoria recibida ${JSON.stringify({ _id, name })}`);
        const {
          success, data, error,
        } = await orderServices().createNewOrder({
          recipe,
          kafkaOrderStorageProducer,
        });
        if (!success) {
          throw new Error(error?.message);
        }
        io.emit('newOrder', { order: data });
        console.log('Orden creada y enviada al almacén');
        return {
          success,
          data,
        };
      };
    };
  };
}
