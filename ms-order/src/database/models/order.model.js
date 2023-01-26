import { model, Schema } from 'mongoose';
import { Collection, OrderStatus } from '../../utils/enums';

const orderSchema = new Schema({
  status: {
    type: String,
    default: OrderStatus.PENDING,
    required: true,
  },
  recipeId: {
    ref: Collection.RECIPE,
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });
orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});
export const OrderModel = model(Collection.ORDER, orderSchema);
