"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type AddToCartProps = {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function AddToCart({
  productId,
  title,
  price,
  thumbnail,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  }

  function handleAddToCart() {
    addToCart({
      productId,
      title,
      price,
      thumbnail,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <div className="space-y-4">

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">
          Quantity
        </p>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200">

          <button
            onClick={decreaseQuantity}
            className="px-4 py-3 text-lg transition hover:bg-gray-100"
          >
            −
          </button>

          <span className="min-w-12 text-center font-medium">
            {quantity}
          </span>

          <button
            onClick={increaseQuantity}
            className="px-4 py-3 text-lg transition hover:bg-gray-100"
          >
            +
          </button>

        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800"
      >
        {added ? "✓ Added to Cart" : "Add to Cart"}
      </button>

    </div>
  );
}