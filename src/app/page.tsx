import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <section className="relative overflow-hidden bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">

          <div className="max-w-3xl">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Welcome to Ifra'Store
            </p>

            <h1 className="text-5xl text-white font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Simple shopping.
              <br />
              <span className="text-gold">Better choices.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Discover quality products, explore our collection,
              and find everything you need in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gold/90"
              >
                Shop Now →
              </Link>

              <Link
                href="/about"
                className="rounded-full border bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gold/90"
              >
                Learn More
              </Link>

            </div>

          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gray-200/60 blur-3xl" />

      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="grid gap-6 md:grid-cols-3">

          <Feature
            icon="🚚"
            title="Fast Delivery"
            description="Get your orders delivered quickly and safely."
          />

          <Feature
            icon="🔒"
            title="Secure Shopping"
            description="Your shopping experience is safe and reliable."
          />

          <Feature
            icon="↩️"
            title="Easy Returns"
            description="Simple and hassle-free returns when you need them."
          />

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        <div className="rounded-3xl bg-black px-6 py-16 text-center sm:px-12">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-300">
            Start exploring
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gold sm:text-4xl">
            Find something you love.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Browse our collection and discover products
            selected for you.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black text-black transition hover:bg-gold/90"
          >
            Explore Products
          </Link>

        </div>

      </section>

    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-stone-50 p-7 transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gold">
        {title}
      </h3>

      <p className="mt-2 leading-6 text-gray-600">
        {description}
      </p>

    </div>
  );
}