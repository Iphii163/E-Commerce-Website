"use client";

import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    subtotal,
  } = useCart();

  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Your Shopping Bag
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gold">
            Your Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Looks like you haven't added anything to
              your cart yet.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Start Shopping →
            </Link>

          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            <section className="rounded-3xl border border-gray-200 bg-white px-5 shadow-sm sm:px-8">

              <div className="border-b border-gray-200 py-5">
                <h2 className="font-semibold text-gray-900">
                  Cart Items ({cart.length})
                </h2>
              </div>

              {cart.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              ))}

            </section>

            <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium">
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

              </div>

              <Link
                href="/checkout"
                className="mt-8 block w-full rounded-xl bg-black px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="mt-4 block text-center text-sm font-medium text-gray-500 hover:text-black"
              >
                ← Continue Shopping
              </Link>

            </aside>

          </div>
        )}

      </div>
    </main>
  );
}