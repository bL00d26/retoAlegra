import { Schema, model } from 'mongoose';
import { Collection } from '../../utils/enums';

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },
}, { timestamps: true });
ingredientSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});
export const IngredientModel = model(Collection.INGREDIENT, ingredientSchema);
