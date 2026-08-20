"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";

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

  const { cart, addToCart } = useCart();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const isWatchlisted = isInWatchlist(productId);

  useEffect(() => {
    const existingItem = cart.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      setQuantity(existingItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cart, productId]);

  function handleToggleWatchlist() {
    toggleWatchlist({
      productId,
      title,
      price,
      thumbnail,
    });
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  }

  function handleAddToCart() {
    const existingItem = cart.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      const additionalQuantity =
        quantity - existingItem.quantity;

      if (additionalQuantity > 0) {
        addToCart({
          productId,
          title,
          price,
          thumbnail,
          quantity: additionalQuantity,
        });
      }
    } else {
      addToCart({
        productId,
        title,
        price,
        thumbnail,
        quantity,
      });
    }

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

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="w-full rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800"
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>

        <button
          onClick={handleToggleWatchlist}
          aria-label={
            isWatchlisted
              ? "Remove from watchlist"
              : "Add to watchlist"
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 font-medium text-gray-900 transition hover:bg-gray-100"
        >
          <span
            className={`text-2xl leading-none ${
              isWatchlisted
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            ♥
          </span>

          <span>
            {isWatchlisted
              ? "In Watchlist"
              : "Add to Watchlist"}
          </span>
        </button>
      </div>
    </div>
  );
}