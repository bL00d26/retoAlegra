import mongoose from 'mongoose';
import { RecipeRepository } from './repository/recipe.repository';

export async function databaseConnection() {
  try {
    const {
      MONGO_DB_URI = 'mongodb://db/restaurant',
    } = process.env;
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db running');
  } catch (error) {
    console.log(`Error connecting to db ${error}`);
  }
}

export const recipeRepository = RecipeRepository();
