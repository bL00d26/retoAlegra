import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import { kafkaRecipeOrderConsumer, kafkaStorageOrderConsumer } from './kafka';
import { newOrderInterceptor, ordersInterceptor } from './interceptors';
import { databaseConnection } from './database';

export async function main() {
  const {
    PORT = '3400',
  } = process.env;
  const port = Number(PORT);
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  const server = http.createServer(app);
  const httpServer = server.listen(port);
  console.log(`Server running in port ${port}`);

  const io = new WebSocketServer(httpServer, {
    cors: {
      origin: '*',
    },
  });
  databaseConnection();
  await kafkaRecipeOrderConsumer({ io });
  await kafkaStorageOrderConsumer({ io });

  app.get('/newOrder', async (req, res) => {
    const {
      success,
      result,
      message,
    } = await newOrderInterceptor();
    if (!success) {
      return res.status(500).json({
        success,
        message,
      });
    }
    return res.status(200).json({
      success,
      message,
      result,
    });
  });

  app.get('/orders', async (req, res) => {
    const { success, data, error } = await ordersInterceptor();
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
}
main();
