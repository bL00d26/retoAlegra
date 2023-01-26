import { Kafka, PartitionAssigners } from 'kafkajs';

export default function makeKafkaConsumer({ topic, groupId, workerFunction }) {
  return async function kafkaConsumer() {
    const {
      clientId = 'ms_storage',
      KAFKA_BROKER = 'kafka:29092',
    } = process.env;
    try {
      const kafka = new Kafka({
        clientId,
        brokers: [KAFKA_BROKER],
      });
      const consumer = kafka.consumer({
        groupId,
        sessionTimeout: 15000,
        maxBytes: 5 * 1024 * 1024,
        partitionAssigners: [PartitionAssigners.roundRobin],
      });
      await consumer.connect();
      console.log(`Connected to topic ${topic}`);
      await consumer.subscribe({
        topic,
      });
      await consumer.run({
        eachMessage: workerFunction,
        autoCommit: true,
        autoCommitInterval: 5000,
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };
}
