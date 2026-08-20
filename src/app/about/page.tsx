import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Ifra'Shop",
  description: "What Ifra'Shop is, and what it was built to teach.",
};

export default function AboutPage() {
  return (
    <section className="bg-stone-50 px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
          About
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-gold sm:text-4xl">
          A small shop, built to learn from.
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-ink/70 sm:text-base">
          Ifra&apos;Shop is a hands-on Next.js project. Every product you see
          here comes from a real, free public API
          (dummyjson.com) — nothing is hard-coded — so the app
          demonstrates genuine data fetching, caching, searching and
          filtering rather than a mock version of it.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
          The goal isn&apos;t to be a real store — it&apos;s to be a
          complete, readable example of how a modern Next.js app is
          structured: Server Components that fetch data, Client
          Components for interactivity, cached routes, dynamic product
          pages, loading states, and error handling, all in one small
          codebase you can read start to finish.
        </p>

        <div className="mt-10 grid gap-6 border-t border-ink/10 pt-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold text-gold">
              Next.js 14
            </p>
            <p className="mt-1 text-xs text-gray-600">App Router + TypeScript</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-gold">
              Tailwind CSS
            </p>
            <p className="mt-1 text-xs text-gray-600">Utility-first styling</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-gold">
              Real API
            </p>
            <p className="mt-1 text-xs text-gray-600">dummyjson.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}