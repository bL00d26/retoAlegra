import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { kafkaOrderRecipeConsumer } from './kafka';
import { getRecipeByIdInterceptor, getRecipesInterceptor } from './interceptors';
import { databaseConnection } from './database';
import { getRecipesCache, getRecipeCache } from './middlewares';

async function main() {
  const {
    PORT = '3500',
  } = process.env;
  const port = Number(PORT);
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  databaseConnection();
  await kafkaOrderRecipeConsumer();

  app.get('/recipes', getRecipesCache, async (req, res) => {
    const {
      success,
      data,
      error,
    } = await getRecipesInterceptor();
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
  app.get('/recipe/:id', getRecipeCache, async (req, res) => {
    const { id = '' } = req.params;
    const {
      success,
      data,
      error,
    } = await getRecipeByIdInterceptor(id);
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
