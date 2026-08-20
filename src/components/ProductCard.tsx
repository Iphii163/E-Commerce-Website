"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWatchlist } from "@/context/WatchlistContext";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  rating?: number;
};

export default function ProductCard({
  id,
  title,
  price,
  thumbnail,
  rating,
}: ProductCardProps) {
  const searchParams = useSearchParams();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const isWatchlisted = isInWatchlist(id);

  function handleWatchlistClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();

    toggleWatchlist({
      productId: id,
      title,
      price,
      thumbnail: thumbnail ?? "",
    });
  }

  const currentQuery = searchParams.toString();

  const backUrl = `/products${
    currentQuery ? `?${currentQuery}` : ""
  }`;

  return (
    <Link
      href={`/products/${id}?from=${encodeURIComponent(backUrl)}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {rating !== undefined && (
          <span className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-white text-xs font-bold text-gold shadow-md">
            {rating.toFixed(2)}
          </span>
        )}

        <button
          onClick={handleWatchlistClick}
          aria-label={
            isWatchlisted
              ? "Remove from watchlist"
              : "Add to watchlist"
          }
          className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-white text-2xl leading-none transition-transform hover:scale-110 ${
            isWatchlisted ? "text-red-500" : "text-gray-400"
          }`}
        >
          ♥
        </button>

        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="line-clamp-2 min-h-12 text-base font-semibold text-gray-900">
          {title}
        </h2>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ${price}
          </p>

          <span className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gold/90">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}