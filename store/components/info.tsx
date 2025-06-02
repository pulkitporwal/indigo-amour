import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import getProducts from "@/actions/get-products";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SizeGuidePopup from "./size-guide";
import { mensSizes, womensSizes } from "@/constants";
import Accordion from "./ui/accordion";
import useCart from "@/hooks/use-cart";
import AddToCartButton from "./add-to-cart-button";
import AddToWishlistButton from "./add-to-wishlist-button";
import Image from "next/image";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = async ({ data }) => {
  const relatedProducts = await getProducts({
    collectionTitle: data.collectionTitle,
  });

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl flex items-center gap-2 text-gray-900">
          <div className="line-through text-neutral-500 font-normal ">
            <Currency value={data?.cuttedPrice} />
          </div>
          <div className="text-red-600">
            <Currency value={data?.price} />
          </div>
          <div className="text-xs h-6 bg-[#EE6470] text-white px-1 py-1">
            SAVE {data?.discount}%
          </div>
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6 ">
        <div>{data?.description}</div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div className="flex">
            {data?.size?.name}{" "}
            <SizeGuidePopup
              title="Size Chart"
              mensSizeInfo={mensSizes}
              womensSizeInfo={womensSizes}
            />
          </div>
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
      <div className="mt-8 flex items-start flex-wrap flex-shrink-0 justify-start gap-8 ">
        {relatedProducts?.map((product) => (
          <Link
            className={cn(
              "bg-neutral-100 border rounded-md px-5 py-2 ",
              product.id === data.id && "bg-[#01548A] text-white"
            )}
            href={`/product/${product.id}`}
          >
            <div className="flex items-center justify-center gap-2" key={product.id}>
              <span className=" flex items-center justify-center gap-2">
                <div className="h-9 w-9 overflow-hidden rounded-full border border-gray-600">
                  <Image src={data?.images[0].url} width={100} height={100} />
                </div>
                {product.color?.name}
              </span>
              {"  |  "}
              <span>{product.size?.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <Accordion
        title="Shipping Information"
        content={data?.shippingAvailable}
        icon={
          <svg
            width={24}
            height={24}
            viewBox="0 0 1024 1024"
            className="icon mr-5"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M425.176 123.4h554.432v424.992H425.176z"
                fill="#E6246B"
              ></path>
              <path
                d="M893.832 809.152c47.384 0 85.784-38.392 85.784-85.784V543.624H425.976V241.288l-234.064-0.768L40.92 492.192V723.36c0 47.392 38.392 85.784 85.752 85.784h767.16z"
                fill="#F6B246"
              ></path>
              <path
                d="M893.832 809.152c47.384 0 85.784-38.392 85.784-85.784V603.832H40.92V723.36c0 47.392 38.392 85.784 85.752 85.784h767.16z"
                fill="#ECD4BE"
              ></path>
              <path
                d="M853.728 824.552c0 56.152-45.504 101.592-101.6 101.592-56.152 0-101.592-45.448-101.592-101.592 0-56.096 45.448-101.6 101.592-101.6 56.088 0 101.6 45.512 101.6 101.6zM379.584 824.552c0 56.152-45.48 101.592-101.6 101.592s-101.6-45.448-101.6-101.592c0-56.096 45.48-101.6 101.6-101.6s101.6 45.512 101.6 101.6z"
                fill="#0093D3"
              ></path>
              <path
                d="M264.192 454.568H62.848l109.128-178.736h92.216z"
                fill="#E09431"
              ></path>
            </g>
          </svg>
        }
      />
    </div>
  );
};

export default Info;
