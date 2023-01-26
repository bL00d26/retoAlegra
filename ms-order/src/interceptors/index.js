import { kafkaOrderRecipeProducer } from '../kafka';
import { orderServices } from '../services';

import makeOrdersInterceptor from './ordersInterceptor';
import makeNewOrderInterceptor from './newOrderInterceptor';

export const ordersInterceptor = makeOrdersInterceptor({ orderServices });
export const newOrderInterceptor = makeNewOrderInterceptor({
  messageProducer: kafkaOrderRecipeProducer,
});
