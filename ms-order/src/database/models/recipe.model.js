import { Schema, model } from 'mongoose';
import { Collection } from '../../utils/enums';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: Collection.INGREDIENT,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
}, { timestamps: true });
recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});
export const RecipeModel = model(Collection.RECIPE, recipeSchema);
