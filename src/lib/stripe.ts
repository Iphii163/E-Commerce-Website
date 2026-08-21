import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY. Copy .env.local.example to .env.local " +
      "and add your Stripe test secret key from " +
      "https://dashboard.stripe.com/test/apikeys"
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);