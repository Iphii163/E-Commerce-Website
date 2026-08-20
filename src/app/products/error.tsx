"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
          ⚠️
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn't load the products.
          Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-7 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Try Again
        </button>

      </div>

    </main>
  );
}