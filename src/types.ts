import { z } from "zod";

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

// ShippingForm ke liye schema : yha ham zod ka schema bna rhe h
export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is Required!"),
  email: z.string().min(1, "email is Required!"),
  phone: z
    .string()
    .min(7, "Phone Number must be between 7 and 10 digits!")
    .max(10, "Phone Number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone Number must contain only numbers!"),
  address: z.string().min(1, "address is Required!"),
  city: z.string().min(1, "City is Required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

// paymentFormSchema ke liye schema :
export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "card holder is Required!"),
  cardNumber: z
    .string()
    .min(16, "card number is Required!")
    .max(16, "card number is Required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "expirationDate must be in MM/YY format!",
    ),
  cvv: z.string().min(3, "CVV is Required!").max(3, "CVV is Required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;
