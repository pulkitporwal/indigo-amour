"use client"
import useCart from "@/hooks/use-cart";
import React from "react";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";

const AddToCartButton = ({ data }) => {
  const cart = useCart();

  const onAddToCart = (event: any) => {
    console.log("clicked");
    event.stopPropagation();
    cart.addItem(data);
  };
  return (
    <Button
      onClick={onAddToCart}
      className="bg-[#EE6470] flex-[19] w-full justify-center text-white flex items-center gap-x-2 rounded-md"
    >
      Add to Cart
      <ShoppingCart />
    </Button>
  );
};

export default AddToCartButton;
