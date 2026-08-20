export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-12 w-72 animate-pulse rounded-xl bg-gray-200" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />
        </div>

        {/* Filter Skeleton */}
        <div className="mb-8 h-20 animate-pulse rounded-2xl bg-white" />

        {/* Product Skeletons */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              {/* Image */}
              <div className="aspect-square animate-pulse bg-gray-200" />

              {/* Content */}
              <div className="space-y-3 p-5">

                <div className="h-5 animate-pulse rounded bg-gray-200" />

                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />

              </div>
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}