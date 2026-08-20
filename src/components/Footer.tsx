export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-ivory/70">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm">
        <p className="font-display text-lg text-ivory">Ifra&apos;Shop</p>
        <p className="mt-2 max-w-md">
          A learning project built with Next.js App Router — covering data
          fetching, caching, searching, filtering and dynamic routes.
        </p>
        <p className="mt-6 text-xs text-gray-400">
          Product data courtesy of dummyjson.com, used for demo purposes
          only.
        </p>
      </div>
    </footer>
  );
}
