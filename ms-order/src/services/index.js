import { makeOrderServices } from './order.service';
import { orderRepository } from '../database';

export const orderServices = makeOrderServices({ orderRepository });
