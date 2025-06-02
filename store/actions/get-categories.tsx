import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async () => {
  const res = await fetch(URL);

  const data = await res.json();

  return data?.categories;
};

export default getCategories;
