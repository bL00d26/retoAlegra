export default function makeOrdersInterceptor({ redisClient }) {
  return async function ordersInterceptor() {
    try {
      const result = await redisClient().setValue({ key: 'test', value: { test: 'hola' } });
      return {
        success: true,
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  };
}
