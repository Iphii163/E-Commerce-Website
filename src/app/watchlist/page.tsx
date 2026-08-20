"use client";

import Link from "next/link";
import WatchlistItem from "@/components/watchlist/WatchlistItem";
import { useWatchlist } from "@/context/WatchlistContext";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Saved For Later
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gold">
            Your Watchlist
          </h1>
        </div>

        {watchlist.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🤍
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              Your watchlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Tap the heart icon on any product to save it
              here.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Start Shopping →
            </Link>

          </div>
        ) : (
          <section className="rounded-3xl border border-gray-200 bg-white px-5 shadow-sm sm:px-8">

            <div className="border-b border-gray-200 py-5">
              <h2 className="font-semibold text-gray-900">
                Watchlist Items ({watchlist.length})
              </h2>
            </div>

            {watchlist.map((item) => (
              <WatchlistItem
                key={item.productId}
                item={item}
                onRemove={removeFromWatchlist}
              />
            ))}

          </section>
        )}

      </div>
    </main>
  );
}
