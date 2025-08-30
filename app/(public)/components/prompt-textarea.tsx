"use client";

import { useQuery } from "convex/react";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InputWithElement } from "@/components/ui/input";

import { api } from "@/convex/_generated/api";
import { routes } from "@/utils/routes";

export const PromptTextarea = (props: React.ComponentProps<typeof InputWithElement>) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const user = useQuery(api.auth.currentUser);

  const handleSendClick = () => {
    sessionStorage.setItem("prompt", value);
    if (!user) {
      router.push(routes.signIn);
      return;
    }

    router.push(routes.gen("new"));
  };

  return (
    <div className="relative w-full max-w-lg">
      <InputWithElement
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`h-12 w-full resize-none outline-none ${props.className}`}
        placeholder=""
        trailingElement={
          <Button className="size-6.5 rounded-full" onClick={handleSendClick} type="button">
            <ArrowUp />
            <span className="sr-only">Generate</span>
          </Button>
        }
        {...props}
      />

      {!value && <AnimatedPlaceholder />}
    </div>
  );
};

const placeholderIdeas = [
  "Generate image of a nano banana",
  "Create a cyberpunk cat in neon lights",
  "Design a floating island with waterfalls",
  "Paint a sunset over a crystal city",
  "Sketch a robot playing chess",
  "Imagine a treehouse in the clouds",
  "Visualize a steampunk airship",
  "Conjure a magical library in space",
  "Render a dragon made of flowers",
  "Craft a futuristic underwater base",
];

const placeholderVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 0.6,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const placeholderTransition: Transition = {
  duration: 0.5,
  ease: "easeInOut",
};

const AnimatedPlaceholder = () => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const delay = 5_000;

    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderIdeas.length);
    }, delay);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden px-3">
      <AnimatePresence mode="wait">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          transition={placeholderTransition}
          key={currentPlaceholderIndex}
          variants={placeholderVariants}
          className="text-muted-foreground w-full truncate text-base"
        >
          {placeholderIdeas[currentPlaceholderIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
