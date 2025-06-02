"use client";
import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import getProducts from "@/actions/get-products";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/use-cart";
import AddToCartButton from "./add-to-cart-button";
import AddToWishlistButton from "./add-to-wishlist-button";

interface ModalInfoProps {
  data: Product;
}

const ModalInfo: React.FC<ModalInfoProps> = ({ data }) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl flex gap-2 text-gray-900">
          <div className="line-through text-neutral-500 font-normal ">
            <Currency value={data?.cuttedPrice} />
          </div>
          <div className="text-red-600">
            <Currency value={data?.price} />
          </div>
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6 ">
        <pre>{data?.description}</pre>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div className="flex">{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Colors:</h3>
          <div>{data?.color?.name}</div>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          ></div>
        </div>
      </div>
      <div className="mt-8 flex gap-2">
        <AddToCartButton data={data} />
        <AddToWishlistButton data={data} />
      </div>
    </div>
  );
};

export default ModalInfo;
