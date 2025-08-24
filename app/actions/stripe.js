"use server";

import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { headers } from "next/headers";

export async function createCheckoutSession(data) {
  const ui_mode = "hosted";
  const origin = headers().get("origin");
  const courseId = data.get("courseId");
  const title = data.get("title");
  const price = data.get("price");
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
          },
          unit_amount: formatAmountForStripe(price, "usd"),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });
  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(data) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(data.get("price"), "usd"),
    payment_method_types: ["card"],
    currency: "usd",
  });
  return {
    client_secret: paymentIntent.client_secret,
  };
}
