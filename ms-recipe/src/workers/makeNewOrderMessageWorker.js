export default function makeNewOrderMessageWorker({ recipeServices }) {
  return function injectKafkaProducer({ kafkaRecipeOrderProducer }) {
    return async function newOrderMessageWorker({ message }) {
      const messageValue = JSON.parse(message.value.toString());
      console.log(`Solicitud de orden recibida ${messageValue}`);
      const { success, data, error } = await recipeServices()
        .newRandomRecipe({ kafkaRecipeOrderProducer });
      if (!success) {
        throw new Error(error?.message);
      }
      const { _id, name } = data;
      console.log(`Nueva receta aleatoria enviada ${JSON.stringify({ _id, name })}`);
      return { success, data };
    };
  };
}
