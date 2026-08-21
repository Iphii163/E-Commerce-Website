"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

type PlacedOrder = {
  orderNumber: string;
  items: {
    productId: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
};

const paymentOptions = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "easypaisa", label: "Easypaisa / JazzCash" },
  { value: "card", label: "Credit / Debit Card" },
];

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (paymentMethod === "card") {
      setStripeError(null);
      setIsRedirecting(true);

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            email,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.url) {
          throw new Error(data.error || "Something went wrong.");
        }

        window.location.href = data.url;
      } catch (error) {
        console.error(error);
        setStripeError(
          "We couldn't start the payment. Please try again."
        );
        setIsRedirecting(false);
      }

      return;
    }

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `ORD-${randomDigits}`;

    const order: PlacedOrder = {
      orderNumber,
      items: cart,
      name: formData.get("name") as string,
      email,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      postal: formData.get("postal") as string,
      paymentMethod,
      subtotal,
      shipping,
      total,
    };

    setPlacedOrder(order);
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced && placedOrder) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">

        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Order Confirmed!
            </h1>

            <p className="mt-2 text-sm font-medium text-gray-400">
              Order #{placedOrder.orderNumber}
            </p>

            <p className="mt-3 text-gray-500">
              Thank you, {placedOrder.name}. Your order has been
              successfully placed.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 p-6 text-sm">

            <h2 className="text-base font-semibold text-gray-900">
              Shipping Details
            </h2>

            <div className="mt-3 space-y-1 text-gray-600">
              <p>{placedOrder.name}</p>
              <p>{placedOrder.email}</p>
              <p>{placedOrder.address}</p>
              <p>
                {placedOrder.city}, {placedOrder.postal}
              </p>
            </div>

            <h2 className="mt-6 text-base font-semibold text-gray-900">
              Payment Method
            </h2>

            <p className="mt-3 text-gray-600">
              {
                paymentOptions.find(
                  (option) => option.value === placedOrder.paymentMethod
                )?.label
              }
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 p-6">

            <h2 className="text-base font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-4 space-y-4">
              {placedOrder.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.title}
                    </p>

                    <p className="mt-1 text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${placedOrder.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>${placedOrder.shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold">
                  ${placedOrder.total.toFixed(2)}
                </span>
              </div>

            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-block rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white"
            >
              Continue Shopping
            </Link>
          </div>

        </div>

      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">

        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add some products before checking out.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-block rounded-full bg-black px-7 py-3 text-sm font-semibold text-white"
          >
            Browse Products
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <Link
            href="/cart"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to Cart
          </Link>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
            Checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >

            <h2 className="text-xl font-bold text-gray-900">
              Shipping Information
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="Street address"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    placeholder="City"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postal"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Postal Code
                  </label>

                  <input
                    id="postal"
                    name="postal"
                    type="text"
                    required
                    placeholder="Postal code"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>

              </div>

              <div>
                <label
                  htmlFor="paymentMethod"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Payment Method
                </label>

                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                >
                  {paymentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <button
              type="submit"
              disabled={isRedirecting}
              className="mt-8 w-full rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRedirecting
                ? "Redirecting to Stripe…"
                : paymentMethod === "card"
                ? "Pay with Card"
                : "Place Order"}
            </button>

            {stripeError && (
              <p className="mt-3 text-center text-sm text-red-600">
                {stripeError}
              </p>
            )}

          </form>

          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-bold text-gray-900">
              Your Order
            </h2>

            <div className="mt-6 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.title}
                    </p>

                    <p className="mt-1 text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    $
                    {(item.price * item.quantity).toFixed(
                      2
                    )}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span>
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between border-t pt-4 text-base">
                <span className="font-semibold">
                  Total
                </span>

                <span className="font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}