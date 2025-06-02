import { Suspense } from "react";
import dynamic from "next/dynamic";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Loader from "@/components/ui/loader";

export const revalidate = 0;

const Gallery = dynamic(() => import("@/components/gallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center rounded-lg">
      <Loader />
    </div>
  ),
});

const Info = dynamic(() => import("@/components/info"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center rounded-lg">
      <Loader />
    </div>
  ),
});

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <p className="text-neutral-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="w-full">
              <Suspense
                fallback={
                  <div className="w-full h-[500px] flex items-center justify-center rounded-lg">
                    <Loader />
                  </div>
                }
              >
                <Gallery images={product.images} />
              </Suspense>
            </div>
            <div className="w-full">
              <Suspense
                fallback={
                  <div className="w-full h-[400px] flex items-center justify-center rounded-lg">
                    <Loader />
                  </div>
                }
              >
                <Info data={product} />
              </Suspense>
            </div>
          </div>
          <hr className="my-10" />
          <Suspense
            fallback={
              <div className="w-full h-[200px] flex items-center justify-center rounded-lg">
                <Loader />
              </div>
            }
          >
            <ProductList title="Related Items" items={suggestedProducts} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
