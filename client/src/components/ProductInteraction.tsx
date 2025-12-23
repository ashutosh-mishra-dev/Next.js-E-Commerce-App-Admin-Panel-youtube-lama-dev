"use client";

import useCartStore from "@/store/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addTocart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchparams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addTocart({ ...product, quantity, selectedColor, selectedSize });
    toast.success("Product Added to cart");
  };
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/*SIZE*/}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 ${selectedSize === size ? "border-gray-600" : "border-gray-300"} p-[2px]`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"} text-center`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*COLOR*/}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 ${selectedColor === color ? "border-gray-300" : "border-white"} p-[2px]`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className={`h-6 w-6`} style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/*QUANTITY*/}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="cursor-pointer border-1 border-gray-300 p-1"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleQuantityChange("increment")}
            className="cursor-pointer border-1 border-gray-300 p-1"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* BUTTONS */}
      <button
        onClick={handleAddToCart}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-lg"
      >
        <Plus className="h-4 w-4" />
        Add to Cart
      </button>
      <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-800 shadow-lg ring-1 ring-gray-400">
        <ShoppingCart className="h-4 w-4" />
        Buy This Item
      </button>
    </div>
  );
};

export default ProductInteraction;
