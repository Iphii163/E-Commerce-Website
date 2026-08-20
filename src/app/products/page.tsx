import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/products/FilterBar";
import Pagination from "@/components/products/Pagination";

import {
  getProducts,
  searchProducts,
  getProductsByCategory,
  getCategories,
} from "@/lib/api";

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
};

const PRODUCTS_PER_PAGE = 20;

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.search || "";
  const category = params.category || "";
  const sort = params.sort || "";

  const page = Math.max(
    1,
    Number(params.page) || 1
  );

  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  let productsPromise;

  if (search) {
    productsPromise = searchProducts(
      search,
      PRODUCTS_PER_PAGE,
      skip
    );
  } else if (category) {
    productsPromise = getProductsByCategory(
      category,
      PRODUCTS_PER_PAGE,
      skip
    );
  } else {
    productsPromise = getProducts(
      PRODUCTS_PER_PAGE,
      skip
    );
  }

  const result = await productsPromise;

  let categories: string[] = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error(
      "Could not load categories:",
      error
    );

    categories = [];
  }

  let { products, total } = result;

  if (sort === "price-low") {
    products = [...products].sort(
      (a: any, b: any) =>
        a.price - b.price
    );
  }

  if (sort === "price-high") {
    products = [...products].sort(
      (a: any, b: any) =>
        b.price - a.price
    );
  }

  if (sort === "rating") {
    products = [...products].sort(
      (a: any, b: any) =>
        b.rating - a.rating
    );
  }

  const totalPages = Math.ceil(
    total / PRODUCTS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10">

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Our Collection
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <h1 className="text-4xl font-bold tracking-tight text-gold sm:text-5xl">
                Shop Products
              </h1>

              <p className="mt-3 max-w-xl text-gray-500">
                Explore our collection and find
                something you'll love.
              </p>

            </div>

            <p className="text-sm text-gray-500">
              {total} products found
            </p>

          </div>

        </div>

        <FilterBar
          categories={categories}
        />

        {products.length === 0 ? (

          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">

            <div className="text-4xl">
              🔍
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {products.map(
                (product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    thumbnail={product.thumbnail}
                    rating={product.rating}
                  />
                )
              )}

            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
            />
          </>

        )}

      </div>

    </main>
  );
}