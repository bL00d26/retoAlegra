export default function makeGetRedisCache({ redisClient }) {
  async function getRedisCache({ key }) {
    const result = await redisClient().getValue(key);
    const parsedResult = JSON.parse(result);
    return parsedResult;
  }

  async function setRedisCache({ key, value }) {
    const result = await redisClient().setValue({ key, value });
    return result;
  }
  return {
    getRedisCache,
    setRedisCache,
  };
}
