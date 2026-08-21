# Ifra'Store 🛍️

A modern, full-featured e-commerce web app built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS** — with real product data, real search/filter/pagination, a persistent cart & watchlist, and real Stripe card payments.

Built as a hands-on learning project to practice the core patterns of a production-style Next.js app: server-side data fetching & caching, dynamic routes, client-side state management, and a real payment integration.

---

## ✨ Features

- **Product catalog** — browse products fetched live from [DummyJSON](https://dummyjson.com), with server-side caching (`revalidate`) so pages load fast but stay fresh
- **Search** — live search across all products
- **Category filtering** — filter the catalog by category
- **Sorting** — sort results (price, etc.)
- **Pagination** — browse large result sets a page at a time
- **Product detail pages** — dynamic routes (`/products/[id]`) with an image gallery
- **Shopping cart** — add/remove items, update quantities, persisted in `localStorage` via React Context
- **Watchlist** — save products for later, persisted in `localStorage`
- **Checkout flow** — shipping information form with a choice of payment methods:
  - Cash on Delivery
  - **Credit / Debit Card — real payment via Stripe Checkout**
- **Stripe integration** — card payments redirect to a secure, Stripe-hosted checkout page; a success page confirms the real payment status before showing the order confirmation and clearing the cart
- **About page** — static page describing the project
- Fully responsive, clean UI built with Tailwind CSS

---

## 🛠️ Tech Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| State | React Context (`CartContext`, `WatchlistContext`) + `localStorage` |
| Product data | [DummyJSON](https://dummyjson.com) (free public API) |
| Payments | [Stripe](https://stripe.com) (Checkout Sessions) |
| Linting | ESLint (`eslint-config-next`) |

---

## 📂 Project Structure

```
src/
  app/
    page.tsx                    Home page
    about/page.tsx               About page
    products/
      page.tsx                    Product listing — search, filter, sort, pagination
      loading.tsx                  Loading skeleton
      error.tsx                    Error boundary
      [id]/
        page.tsx                    Product detail page (dynamic route)
        loading.tsx                  Loading skeleton
    cart/page.tsx                 Shopping cart
    checkout/page.tsx              Checkout — shipping form + payment method
    watchlist/page.tsx             Saved products
    api/
      checkout/route.ts            Creates a Stripe Checkout Session
    layout.tsx                   Root layout — Navbar, Footer, Context providers
  components/
    Navbar.tsx, Footer.tsx, ProductCard.tsx
    products/                    FilterBar, Pagination, ProductDetails, ProductGallery, AddToCart
    cart/CartItem.tsx
    watchlist/WatchlistItem.tsx
  context/
    CartContext.tsx               Cart state (add/remove/update, localStorage)
    WatchlistContext.tsx          Watchlist state (localStorage)
  lib/
    api.ts                       DummyJSON data fetching (products, search, categories)
    stripe.ts                    Stripe server client
  types/
    product.ts                   Shared Product type
```

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd my-shop
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```bash
# Stripe (test mode) — get these from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Used to build Stripe's redirect URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> `.env.local` is git-ignored — never commit real API keys.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Test a card payment

Add a product to your cart → **Proceed to Checkout** → fill in shipping info → select **Credit / Debit Card** → use Stripe's official test card:

| Field | Value |
|---|---|
| Card number | `4242 4242 4242 4242` |
| Expiry | any future date, e.g. `12/34` |
| CVC | any 3 digits |
| ZIP | any 5 digits |

No real money moves in test mode. More test cards: [docs.stripe.com/testing](https://docs.stripe.com/testing)

---

## 🧭 How the checkout flow works

1. **Cart** (`/cart`) — review items, then **Proceed to Checkout** navigates to `/checkout`.
2. **Checkout** (`/checkout`) — fill in shipping details and pick a payment method.
   - **Cash on Delivery / Easypaisa-JazzCash** — the order is recorded immediately (no real payment processor involved for this demo).
   - **Credit / Debit Card** — the app calls `/api/checkout`, which creates a **Stripe Checkout Session** and redirects the browser to Stripe's secure, hosted payment page.
3. After payment, Stripe redirects back to `/checkout/success?session_id=...`. That page verifies the *real* payment status directly with Stripe's API (never trusting the URL alone), then shows the confirmation and clears the cart.

---

## 🙏 Credits

- Product data: [DummyJSON](https://dummyjson.com)
- Payments: [Stripe](https://stripe.com)
- Built with [Next.js](https://nextjs.org) & [Tailwind CSS](https://tailwindcss.com)
