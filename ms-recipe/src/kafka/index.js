import makeKafkaConsumer from './kafkaConsumer';
import { newOrderMessageWorker } from '../workers';
import makeKafkaProducer from './kafkaProducer';

const {
  KAFKA_TOPIC_RECIPE_ORDER = 'recipe-order',
  KAFKA_TOPIC_ORDER_RECIPE = 'order-recipe',
} = process.env;

export const kafkaRecipeOrderProducer = makeKafkaProducer({ topic: KAFKA_TOPIC_RECIPE_ORDER });
const injectedNewOrderMessageWorker = newOrderMessageWorker({ kafkaRecipeOrderProducer });
export const kafkaOrderRecipeConsumer = makeKafkaConsumer({
  topic: KAFKA_TOPIC_ORDER_RECIPE,
  groupId: 'order-recipe',
  workerFunction: injectedNewOrderMessageWorker,
});
