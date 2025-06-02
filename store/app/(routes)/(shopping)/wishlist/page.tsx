"use client";

import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import { useEffect, useState } from "react";
import WishlistItem from "./components/wishlist-item";
import useWishlist from "@/hooks/use-wishlist";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wishlist = useWishlist();

  if (!isMounted) {
    return null;
  }
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Wishlist</h1>
          <div className="lg:col-span-8">
            {wishlist.items.length === 0 && (
              <NoResults message="No Item added in the wishlist" />
            )}
          </div>
          <ul className="my-12">
            {wishlist.items.map((item) => (
              <WishlistItem key={item?.id} data={item} />
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
