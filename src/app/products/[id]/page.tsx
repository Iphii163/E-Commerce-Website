import ProductDetails from "@/components/products/ProductDetails";

type ProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { id } = await params;
  const { from } = await searchParams;
  const backUrl = from || "/products";

  return <ProductDetails id={id} backUrl={backUrl} />;
}