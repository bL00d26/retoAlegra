import makeKafkaConsumer from './kafkaConsumer';
import { newRecipeWorker, finishedOrderWorker } from '../workers';
import makeKafkaProducer from './kafkaProducer';

const {
  KAFKA_TOPIC_ORDER_RECIPE = 'order-recipe',
  KAFKA_TOPIC_ORDER_STORAGE = 'order-storage',
  KAFKA_TOPIC_RECIPE_ORDER = 'recipe-order',
  KAFKA_TOPIC_STORAGE_ORDER = 'storage-order',
} = process.env;

export const kafkaOrderRecipeProducer = makeKafkaProducer({ topic: KAFKA_TOPIC_ORDER_RECIPE });
export const kafkaOrderStorageProducer = makeKafkaProducer({ topic: KAFKA_TOPIC_ORDER_STORAGE });

const injectedNewRecipeWorker = newRecipeWorker({ kafkaOrderStorageProducer });

export const kafkaRecipeOrderConsumer = makeKafkaConsumer({
  topic: KAFKA_TOPIC_RECIPE_ORDER,
  groupId: 'recipe-order',
  workerFunction: injectedNewRecipeWorker,
});
export const kafkaStorageOrderConsumer = makeKafkaConsumer({
  topic: KAFKA_TOPIC_STORAGE_ORDER,
  groupId: 'storage-order',
  workerFunction: finishedOrderWorker,
});
