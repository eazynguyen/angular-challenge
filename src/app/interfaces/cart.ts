import { IResponse } from './response';
import { IProduct } from './product';

export interface ICart {
  id: number;
  products: IProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ICartResponse extends IResponse {
  carts: ICart[];
}
