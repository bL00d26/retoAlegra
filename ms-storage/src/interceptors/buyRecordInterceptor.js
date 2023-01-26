export default function makeBuyRecordInterceptor({ storageServices }) {
  return async function buyRecordInterceptor(id) {
    try {
      const { success, data } = await storageServices().getBuyRecordById(id);
      return {
        success,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };
}
