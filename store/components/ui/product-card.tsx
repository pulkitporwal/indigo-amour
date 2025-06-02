"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { anek } from "@/app/layout";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();
  const previewModal = usePreviewModal();
  const [currentImage, setCurrentImage] = useState(data?.images?.[0]?.url);

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log("clicked");
    event.stopPropagation();
    cart.addItem(data); 
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-white border group rounded-xl overflow-hidden cursor-pointer space-y-4 ${anek.className} xl:max-w-[300px] `}
    >
      
      <div className="relative aspect-sqaure overflow-hidden w-full flex items-start justify-start bg-gray-100 top-0 left-0 h-72 sm:h-[350px] lg:h-[400px] xl:h-[400px] xl:w-[300px]">
        <Image
          className="aspect-square object-cover transition-all duration-300 "
          alt="Image"
          src={currentImage}
          onMouseOver={() => setCurrentImage(data?.images?.[1]?.url)}
          onMouseOut={() => setCurrentImage(data?.images?.[0]?.url)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="md:opacity-0 md:group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div className="absolute top-1 left-2 text-white px-2 pt-1 text-xs bg-[#EE6470]">
        {data.discount} % OFF
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg px-4 capitalize ">{data.name}</p>
      </div>
      <div className="flex items-center justify-start gap-2 px-4 pb-4">
        <div className="line-through text-neutral-500 font-normal ">
          <Currency value={data?.cuttedPrice} />
        </div>
        <div className="text-red-600">
          <Currency value={data?.price} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
