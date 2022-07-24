import {IResponse} from "./response";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isDeleted?: boolean;
  deletedOn?: string;
}

export interface IProductResponse extends IResponse{
  products: IProduct[];
}
