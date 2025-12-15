export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[]; //actual [] likhana padta hai kyuki ham array types check karenge

//agar export type ProductsType = ProductType[]; export nhi karna h to jha bhi aap import karenge vha

//import { ProductType } from "@/Types";
// const products: ProductType[] =  aisa likhana padega

//single object version
export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

//array version
export type CartItemsType = CartItemType[];
