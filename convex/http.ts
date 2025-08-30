import { httpRouter } from "convex/server";

import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

// Custom webhook handler for Polar payments to add credits
http.route({
  method: "POST",
  path: "/webhooks/polar/events/",
  handler: httpAction(async (ctx, req) => {
    try {
      const body = await req.json();

      if (body.type !== "order.paid") {
        return new Response("Event type not handled", { status: 200 });
      }

      const order = body.data;
      const userId = order.customer.metadata.userId;
      const productId = order.product_id;

      if (!userId || !productId) {
        console.error("Missing user ID or product ID in webhook:", body);
        return new Response("Missing required data", { status: 400 });
      }

      // Get credit amount for this product
      const products = await ctx.runQuery(api.polar.getConfiguredProducts);
      const product = Object.values(products || {}).find((product) => product?.id === productId);
      const creditAmount = product?.metadata?.creditCount || 0;

      if (creditAmount === 0) {
        console.error("No credit mapping found for product:", productId);
        return new Response("Product not found", { status: 404 });
      }

      // Add credits to user account
      await ctx.runMutation(api.credits.addCredits, {
        userId: userId,
        amount: Number(creditAmount),
        source: "polar_payment",
        sourceId: order.id,
        metadata: {
          productId: productId,
          orderAmount: order.amount,
          currency: order.currency,
        },
      });

      console.info(
        `[POLAR] Successfully added ${creditAmount} credits to user ${userId} for order ${order.id}`
      );

      return new Response("Credits added successfully", { status: 200 });
    } catch (error) {
      console.error("[POLAR] Error processing webhook:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }),
});

export default http;
