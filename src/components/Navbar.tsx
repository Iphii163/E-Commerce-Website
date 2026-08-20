"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWatchlist } from "@/context/WatchlistContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { watchlistCount } = useWatchlist();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">

          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              Ifra
            </span>

            <span className="font-display text-2xl font-semibold text-gold">
              &apos;Store.
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">

            <Link
              href="/"
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                isActive("/")
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              Home
            </Link>

            <Link
              href="/products"
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                isActive("/products")
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              Products
            </Link>

            <Link
              href="/about"
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                isActive("/about")
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              About
            </Link>
          </div>

          <Link
            href="/watchlist"
            className={`hidden items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-900 transition md:flex ${
              isActive("/watchlist")
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
          >
            <span>
              Watchlist
            </span>

            {watchlistCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-semibold text-white">
                {watchlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="hidden items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-900 transition hover:bg-black hover:text-white md:flex"
          >
            <span>
              Cart
            </span>

            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive("/")
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive("/products")
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Shop
              </Link>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive("/about")
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                About
              </Link>

              <Link
                href="/watchlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                Watchlist

                {watchlistCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs text-white">
                    {watchlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                Cart

                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}