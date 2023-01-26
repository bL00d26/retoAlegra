import Redis from 'ioredis';

export function redisClient() {
  const {
    REDIS_URL = 'redis://redis:6379',
  } = process.env;
  const client = new Redis(REDIS_URL, { maxmaxRetriesPerRequest: null });
  async function getValue(key) {
    try {
      const result = await client.get(key);
      return result;
    } catch (error) {
      return null;
    }
  }
  async function setValue({ key, value }) {
    try {
      const result = await client.set(key, JSON.stringify(value));
      return result;
    } catch (error) {
      return null;
    }
  }

  return {
    setValue,
    getValue,
  };
}
