import { Kafka, Partitioners } from 'kafkajs';

export default function makeKafkaProducer({ topic }) {
  const {
    KAFKA_BROKER = 'kafka:29092',
  } = process.env;
  const kafka = new Kafka({
    clientId: 'recipe',
    brokers: [KAFKA_BROKER],
  });
  return async function kafkaProduceMessage({ message }) {
    const value = JSON.stringify(message);
    const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    await producer.connect();
    await producer.send({
      topic,
      messages: [{
        value,
      }],
    });
    await producer.disconnect();
    return {
      message,
      topic,
    };
  };
}
