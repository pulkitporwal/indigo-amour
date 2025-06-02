"use client";

import { Heart, Search, ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

const NavActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex-1 ml-auto flex items-center gap-x-1 justify-end">
      <Button
        onClick={() => router.push("/cart")}
        className="relative flex items-center1 rounded-full px-3 py-2"
      >
        <ShoppingBag size={24} color="black" />
        <span className=" absolute -top-1 bg-[#EE6470] text-white w-5 h-5 rounded-full right-1 ml-2 text-sm font-medium font-white">
          {cart.items.length}
        </span>
      </Button>
      <Button
        onClick={() => router.push("/wishlist")}
        className="flex items-center1 rounded-full px-3 py-2"
      >
        <Heart size={24} color="#EE6470" />
      </Button>
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center1 rounded-full px-3 py-2"
      >
        <Search size={24} color="#EE6470" />
      </Button>
    </div>
  );
};

export default NavActions;
