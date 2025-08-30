import { httpRouter } from "convex/server";

import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";
import { getCreditsForProduct, polar } from "./polar";

const http = httpRouter();

polar.registerRoutes(http);
auth.addHttpRoutes(http);

// Custom webhook handler for Polar payments to add credits
http.route({
  method: "POST",
  pathPrefix: "/polar/events/",
  handler: httpAction(async (ctx, response) => {
    try {
      const body = await response.json();
      console.info("[POLAR] Webhook received:", body);

      // Verify webhook signature if needed (implementation depends on Polar docs)

      if (body.type !== "order.completed") {
        return new Response("Event type not handled", { status: 200 });
      }

      const order = body.data;
      const userId = order.user_id;
      const productId = order.product_id;

      if (!userId || !productId) {
        console.error("Missing user ID or product ID in webhook:", body);
        return new Response("Missing required data", { status: 400 });
      }

      // Get credit amount for this product
      const creditAmount = getCreditsForProduct(productId);
      if (creditAmount === 0) {
        console.error("No credit mapping found for product:", productId);
        return new Response("Product not found", { status: 404 });
      }

      // Add credits to user account
      await ctx.runMutation(api.credits.addCredits, {
        userId: userId,
        amount: creditAmount,
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
