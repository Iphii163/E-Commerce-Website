"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";

type CartItemType = {
  productId: number;
  quantity: number;
  title: string;
  price: number;
  thumbnail?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error(
          "Failed to load cart:",
          error
        );
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    }
  }, [cart, isLoading]);

  function removeItem(productId: number) {
    const updatedCart = cart.filter(
      (item) =>
        item.productId !== productId
    );

    setCart(updatedCart);
  }

  function updateQuantity(
    productId: number,
    quantity: number
  ) {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity,
          }
        : item
    );

    setCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-gray-500">
            Loading cart...
          </p>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

          <div className="text-5xl">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-500">
            Looks like you haven't added
            anything to your cart yet.
          </p>

          <a
            href="/products"
            className="mt-8 inline-block rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Continue Shopping
          </a>

        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Your Shopping Bag
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            {cart.length}{" "}
            {cart.length === 1
              ? "item"
              : "items"}{" "}
            in your cart
          </p>

        </div>


        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          <div className="space-y-4">

            {cart.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onRemove={removeItem}
                onQuantityChange={
                  updateQuantity
                }
              />
            ))}

          </div>

          <div className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>

                <span>
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>

                <span className="text-gray-900">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">

                <div className="flex justify-between">

                  <span className="font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

            <Link
              href="/checkout"
              className="mt-7 block w-full rounded-xl bg-gray-900 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Proceed to Checkout
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              You&apos;ll enter shipping details and choose a payment
              method next.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}