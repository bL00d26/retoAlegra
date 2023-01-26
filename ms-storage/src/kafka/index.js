import makeKafkaConsumer from './kafkaConsumer';
import { newOrderWorker } from '../workers';
import makeKafkaProducer from './kafkaProducer';

const {
  KAFKA_TOPIC_STORAGE_ORDER = 'storage-order',
  KAFKA_TOPIC_ORDER_STORAGE = 'order-storage',
} = process.env;

export const kafkaStorageOrderProducer = makeKafkaProducer({ topic: KAFKA_TOPIC_STORAGE_ORDER });
const injectedNewOrderStorageWorker = newOrderWorker({ kafkaStorageOrderProducer });
export const kafkaOrderStorageConsumer = makeKafkaConsumer({
  topic: KAFKA_TOPIC_ORDER_STORAGE,
  groupId: 'order-storage',
  workerFunction: injectedNewOrderStorageWorker,
});
