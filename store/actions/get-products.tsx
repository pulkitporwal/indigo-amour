import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  collectionTitle?: string;
  lowerPrice?: string;
  upperPrice?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
      collectionTitle: query.collectionTitle,
      lowerPrice: query.lowerPrice,
      upperPrice: query.upperPrice,
    },
  });
  const res = await fetch(url, {
    mode: "no-cors",
  });

  const data = await res.json();

  return data?.products;
};

export default getProducts;
