"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type WatchlistItemProps = {
  item: {
    productId: number;
    title: string;
    price: number;
    thumbnail: string;
  };
  onRemove: (id: number) => void;
};

export default function WatchlistItem({
  item,
  onRemove,
}: WatchlistItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    const cartItem = cart.find(
      (cartItem) => cartItem.productId === item.productId
    );

    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cart, item.productId]);

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) => (current > 1 ? current - 1 : 1));
  }

  function handleAddToCart() {
    const existingCartItem = cart.find(
      (cartItem) => cartItem.productId === item.productId
    );

    if (existingCartItem) {
      if (quantity > existingCartItem.quantity) {
        addToCart({
          productId: item.productId,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          quantity: quantity - existingCartItem.quantity,
        });
      }
    } else {
      addToCart({
        productId: item.productId,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        quantity,
      });
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <div className="flex gap-4 border-b border-gray-200 py-6 sm:gap-6">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-36 sm:w-36">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="144px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {item.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            ${item.price.toFixed(2)}
          </p>

          <div className="mt-4 flex w-fit items-center overflow-hidden rounded-xl border border-gray-200">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-2 text-gray-600 transition hover:bg-gray-100"
            >
              −
            </button>

            <span className="min-w-10 text-center text-sm font-medium">
              {quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="px-3 py-2 text-gray-600 transition hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onRemove(item.productId)}
            className="text-sm font-medium text-gray-400 transition hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <button
          onClick={handleAddToCart}
          className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 sm:px-6 sm:py-4"
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}