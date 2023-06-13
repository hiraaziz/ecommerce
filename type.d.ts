import { Image as IImage } from "sanity";

declare interface CartItem {
  product_id: string;
  quantity: number;
}

declare type ICart = {
  id: number;
  userid: string;
  quantity: number;
  productid: string;
};

declare type SanityProducts = {
  _id: string;
  images: IImage;
  title: string;
  type: string;
  price: number;
};

declare type SanityProductDetail = {
  _id: string;
  images: IImage;
  title: string;
  type: string;
  price: number;
  description: string;
};
