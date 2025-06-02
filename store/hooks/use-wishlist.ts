import { create } from "zustand";

import { Product } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  getItem: (id: string) => Product | undefined; 
}

const useWishlist = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item?.id === data.id);

        if (existingItem) {
          return toast("Item already in wishlist");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to wishlist");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item?.id !== id)] });
        toast.success("Item removed from wishlist");
      },
      removeAll: () => set({ items: [] }),
      getItem: (id: string) => {
        return get().items.find((item) => item?.id === id); 
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWishlist;
