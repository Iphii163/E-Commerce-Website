import Link from "next/link";
import { stripe } from "@/lib/stripe";
import ClearCartOnLoad from "./ClearCartOnLoad";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            No payment found
          </h1>
          <p className="mt-3 text-gray-500">
            This page is only reached after a Stripe payment redirect.
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

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paid = session.payment_status === "paid";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        {paid && <ClearCartOnLoad />}

        <div className="text-center">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
              paid ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            {paid ? "✓" : "…"}
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            {paid ? "Payment Successful!" : "Payment Pending"}
          </h1>

          <p className="mt-2 text-sm font-medium text-gray-400">
            Session #{session.id.slice(-8)}
          </p>

          <p className="mt-3 text-gray-500">
            {paid
              ? "Thank you — your card payment went through and your order is confirmed."
              : "We haven't received confirmation of this payment yet. If you completed checkout, this can take a few moments."}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900">
            Payment Summary
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-medium">
                ${((session.amount_total ?? 0) / 100).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status</span>
              <span className="font-medium capitalize">
                {session.payment_status}
              </span>
            </div>

            {session.customer_details?.email && (
              <div className="flex justify-between">
                <span className="text-gray-500">Receipt sent to</span>
                <span className="font-medium">
                  {session.customer_details.email}
                </span>
              </div>
            )}
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