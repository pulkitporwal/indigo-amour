"use client";
import React from "react";
import Button from "./ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import useWishlist from "@/hooks/use-wishlist";

const AddToWishlistButton = ({ data }: any) => {
  const wishlist = useWishlist();

  const isInWishlist = wishlist.getItem(data?.id) !== undefined;

  const onAddToWishlist = (event: any) => {
    event.stopPropagation();
    wishlist.addItem(data);
  };

  const onRemoveFromWishlist = (event: any) => {
    event.stopPropagation();
    wishlist.removeItem(data.id);
  };

  console.log("data", data);

  return (
    <Button
      onClick={isInWishlist ? onRemoveFromWishlist : onAddToWishlist}
      className={`flex-1 w-full justify-center text-[#EE6470] border-[#EE6470] border flex items-center gap-x-2 rounded-md`}
    >
      <Heart fill={isInWishlist ? "#EE6470" : "none"} color="#EE6470" />
    </Button>
  );
};

export default AddToWishlistButton;
