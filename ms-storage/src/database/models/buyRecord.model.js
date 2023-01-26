import { model, Schema } from 'mongoose';
import { Collection } from '../../utils/enums';

const buyRecordSchema = new Schema({
  quantitySold: {
    type: Number,
    required: true,
  },
  ingredientId: {
    ref: Collection.INGREDIENT,
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });
buyRecordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});
export const BuyRecordModel = model(Collection.BUY_RECORD, buyRecordSchema);
