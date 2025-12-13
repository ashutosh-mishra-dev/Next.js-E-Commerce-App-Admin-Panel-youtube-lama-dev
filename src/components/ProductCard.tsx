import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      {/* IMAGE */}
      <Link href={`products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[product.colors[0]]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      </Link>
      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/*  SIZES */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="rounded-md px-2 py-1 ring ring-gray-300"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size.toUpperCase()}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {/*  COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div className="" key={color}>
                  <div
                    className="h-[14px] w-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE AND ADD TO CARD BUTTON */}
        <div className="flex items-center justify-between">
          {/* yha hamne toFixed 3.9 to 3.90 last me do digit dikhayega */}
          <p className="font-medium">{product.price.toFixed(2)}</p>
          <button className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:bg-black hover:text-white">
            <ShoppingCart className="h-4 w-4" />
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
