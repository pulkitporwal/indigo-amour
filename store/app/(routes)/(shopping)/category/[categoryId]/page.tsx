import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import PriceFilter from "./components/price-filter";

interface CategoryProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
    lowerPrice: string;
    upperPrice: string;
  };
}

export const revalidate = 0;

const Category: React.FC<CategoryProps> = async ({ params, searchParams }) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    lowerPrice: searchParams.lowerPrice,
    upperPrice: searchParams.upperPrice,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      {/* <Container> */}
      <Billboard data={category.billboard} />
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={sizes} colors={colors} />
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
            <PriceFilter />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-4">
            {products?.length === 0 && <NoResults />}
            <div className="flex items-center flex-wrap gap-4">
              {products?.map((item) => (
                <ProductCard data={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
};

export default Category;
