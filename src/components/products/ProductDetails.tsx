"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductGallery from "@/components/products/ProductGallery";
import AddToCart from "@/components/products/AddToCart";
import { getProduct } from "@/lib/api"; // apna actual path check kar lena

type ProductDetailsProps = {
  id: string;
  backUrl: string;
};

export default function ProductDetails({ id, backUrl }: ProductDetailsProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-10 text-center text-gray-500">Loading...</p>;
  }

  if (error || !product) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link href={backUrl} className="mb-8 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gold/90">
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={backUrl}
          className="mb-8 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gold/90"
        >
          ← Back to products
        </Link>

        <div className="grid gap-10 rounded-3xl border bg-white p-6 shadow-sm md:p-10 lg:grid-cols-2">
          <ProductGallery images={product.images} title={product.title} />

          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-400">· {product.stock} in stock</span>
            </div>

            <div className="mt-6">
              <span className="text-3xl font-bold">${product.price}</span>
            </div>

            <p className="mt-6 leading-7 text-gray-600">{product.description}</p>

            <div className="my-8 border-t" />

            <AddToCart
              productId={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
            />

            <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6 text-sm">
              <div>
                <p className="text-gray-400">Brand</p>
                <p className="mt-1 font-medium">{product.brand}</p>
              </div>
              <div>
                <p className="text-gray-400">Availability</p>
                <p className="mt-1 font-medium">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}