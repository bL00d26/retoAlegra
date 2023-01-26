export default function makeBuyRecordsInterceptor({ storageServices }) {
  return async function buyRecordsInterceptor() {
    try {
      const { success, data } = await storageServices().getBuyRecords();
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
