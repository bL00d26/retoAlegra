/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { kafkaOrderStorageConsumer } from './kafka';
import {
  ingredientsInterceptor, ingredientInterceptor,
  buyRecordInterceptor, buyRecordsInterceptor,
} from './interceptors';
import { databaseConnection } from './database';

async function main() {
  const {
    PORT = '3600',
  } = process.env;
  const port = Number(PORT);
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  databaseConnection();
  await kafkaOrderStorageConsumer();

  app.get('/ingredient/:id', async (req, res) => {
    const { id } = req.params;
    const { success, data, error } = await ingredientInterceptor(id);
    if (!success) {
      return res.status(500).json({
        success,
        error,
      });
    }
    return res.status(200).json({
      success,
      data,
    });
  });
  app.get('/ingredients', async (req, res) => {
    const { success, data, error } = await ingredientsInterceptor();
    if (!success) {
      return res.status(500).json({
        success,
        error,
      });
    }
    return res.status(200).json({
      success,
      data,
    });
  });
  app.get('/buyRecord/:id', async (req, res) => {
    const { id } = req.params;
    const { success, data, error } = await buyRecordInterceptor(id);
    if (!success) {
      return res.status(500).json({
        success,
        error,
      });
    }
    return res.status(200).json({
      success,
      data,
    });
  });
  app.get('/buyRecords', async (req, res) => {
    const { success, data, error } = await buyRecordsInterceptor();
    if (!success) {
      return res.status(500).json({
        success,
        error,
      });
    }
    return res.status(200).json({
      success,
      data,
    });
  });
  app.listen(port, () => {
    console.log('Server running in port ', port);
  });
}

main().catch((error) => console.log(error));
