"use client";

import { useAction, useQuery } from "convex/react";
import { AnimatePresence, motion, Transition } from "framer-motion";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { opacityFadeInOut, slideLeft, slideRight, transition250 } from "@/utils/motion";
import { routes } from "@/utils/routes";
import { cn } from "@/utils/ui";

const tabTransition: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.6,
};

export const PlanSelection = () => {
  const products = useQuery(api.polar.getConfiguredProducts);
  const plans = [products?.hobby, products?.pro].filter(Boolean);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);

  const generateCheckoutLink = useAction(api.polar.generateCheckoutLink);

  const activePlan = plans.find((plan) => plan?.id === activePlanId);

  const handlePlanClick = async (planId: string | null) => {
    if (!planId) return;

    const response = await generateCheckoutLink({
      productIds: [planId],
      origin: window.location.origin,
      successUrl: window.location.origin + routes.gen,
    });

    if (response) {
      window.location.href = response.url;
    }
  };

  useEffect(() => {
    if (!activePlanId && plans[0]) {
      setActivePlanId(plans[0].id);
    }
  }, [activePlanId, plans]);

  return (
    <AnimatePresence initial={false} mode="wait">
      {products ? (
        <motion.section
          className="mx-auto flex w-full max-w-sm flex-col gap-4 overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transition250}
          variants={opacityFadeInOut}
        >
          <header className={cn("bg-secondary p-1.25 flex h-11 rounded-full [&>button]:flex-1")}>
            {plans.map(
              (plan) =>
                plan && (
                  <Button
                    key={plan.id}
                    size="sm"
                    variant="ghost"
                    onClick={() => setActivePlanId(plan.id)}
                    className="relative rounded-full"
                  >
                    {activePlanId === plan.id && (
                      <motion.span
                        layoutId={`home-page-active-plan`}
                        className="absolute inset-0 z-10 rounded-full bg-white mix-blend-difference"
                        transition={tabTransition}
                      />
                    )}
                    {plan.metadata?.displayName || plan.name}
                  </Button>
                )
            )}
          </header>

          <div className="bg-secondary/10 overflow-hidden rounded-lg border">
            <AnimatePresence mode="popLayout">
              <motion.button
                key={activePlanId}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={tabTransition}
                variants={activePlanId === plans[0]?.id ? slideRight : slideLeft}
                onClick={() => handlePlanClick(activePlanId)}
                className="hover:bg-secondary group flex w-full flex-col items-center gap-2 p-4 transition-colors"
              >
                <h3 className="text-muted-foreground group-hover:text-foreground group-hover:scale-120 text-base font-medium transition-transform duration-300">
                  {activePlan?.name}
                </h3>
                <p className="group-hover:text-muted-foreground text-2xl font-medium transition-colors">
                  ${(activePlan?.prices[0].priceAmount ?? 0) / 100}/month
                </p>
              </motion.button>
            </AnimatePresence>
          </div>
        </motion.section>
      ) : (
        <PlanSkeleton />
      )}
    </AnimatePresence>
  );
};

const PlanSkeleton = () => {
  return (
    <motion.section
      className="mx-auto flex w-full max-w-sm flex-col gap-4 overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={transition250}
      variants={opacityFadeInOut}
    >
      <Skeleton className="h-12 w-full rounded-full" />
      <Skeleton className="h-24 w-full rounded-lg" />
    </motion.section>
  );
};
