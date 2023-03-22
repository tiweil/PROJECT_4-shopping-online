import { CartModel } from './cart.model';
import { ClientModel } from './client.model';

export class OrderModel {
  _id: string;
  clientId?: ClientModel;
  cartId: CartModel;
  sum: number;
  city: string;
  street: string;
  arrival_date: Date;
  order_date: string;
  last_fourCC: number;
}
