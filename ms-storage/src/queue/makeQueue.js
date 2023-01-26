import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';

export function makeQueue({ name, queueWorker, makeCompletedWorker }) {
  return function BullQueue({ kafkaStorageOrderProducer }) {
    const {
      REDIS_URL = 'redis://redis:6379',
    } = process.env;
    const connection = new Redis(REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
    const myQueue = new Queue(name, {
      defaultJobOptions: {
        delay: 3000,
      },
      connection,
    });
    const worker = new Worker(name, queueWorker, { connection });
    async function repeatSameJob(job) {
      const newJob = await myQueue.add(name, job.data, { ...{ priority: 1 }, ...job.opts });
      return newJob;
    }
    const completedWorker = makeCompletedWorker({ kafkaStorageOrderProducer });
    worker.on('completed', completedWorker);
    worker.on('failed', async (job) => {
      await repeatSameJob(job);
    });
    worker.on('error', (err) => console.error(err));
    async function addToQueue({ data }) {
      try {
        await myQueue.add(name, data);
        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error,
        };
      }
    }

    return {
      addToQueue,
    };
  };
}
