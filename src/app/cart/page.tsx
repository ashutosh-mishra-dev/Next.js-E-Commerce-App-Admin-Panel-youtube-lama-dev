"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { CartItemsType } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

// TEMPORARY
const cartItems: CartItemsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    quantity: 1,
    selectedSize: "m",
    selectedColor: "gray",
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "gray",
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    quantity: 1,
    selectedSize: "s",
    selectedColor: "black",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [shippingForm, setShippingForm] = useState(null);

  const activeStep = parseInt(searchParams.get("step") || "1");

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-8">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* STEPS */}
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800" : "border-gray-200"}`}
            key={step.id}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full p-4 text-white ${step.id === activeStep ? "bg-gray-800" : "bg-gray-400"}`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      <div className="flex w-full flex-col gap-16 lg:flex-row">
        {/* STEPS */}
        <div className="flex w-full flex-col gap-8 rounded-lg border-1 border-gray-100 p-8 shadow-lg lg:w-7/12">
          {activeStep === 1 ? (
            cartItems.map((item) => (
              // SINGLE CART ITEMS
              <div className="flex items-center justify-between" key={item.id}>
                {/* IMAGE & DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity :{""} {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size :{""} {item.selectedSize}
                      </p>
                      <p className="text-sm text-gray-500">
                        Color :{""} {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">$ {item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-100 text-red-400 transition-all duration-300 hover:bg-red-200">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue.
            </p>
          )}
        </div>
        {/*DETAILS */}
        <div className="flex h-max w-full flex-col gap-8 rounded-lg border-1 border-gray-100 p-8 shadow-lg lg:w-5/12">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Sub total</p>
              <p className="font-medium">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount(10%) </p>
              <p className="font-medium">$ 10</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$ 10</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">Total</p>
              <p className="font-medium">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-2 text-white transition-all duration-300 hover:bg-gray-900"
            >
              Continue
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
