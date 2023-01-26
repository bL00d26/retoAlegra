export default function makeNewOrderInterceptor({ messageProducer }) {
  return async function newOrderInterceptor() {
    try {
      const message = 'newRandomRecipe';
      const result = await messageProducer({ message });
      return {
        success: true,
        data: 'Orden enviada con éxito',
        result,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
}
