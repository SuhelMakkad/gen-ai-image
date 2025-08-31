"use client";

import { motion } from "framer-motion";

import { useMemo } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { fadeSlideIn, transition350 } from "@/utils/motion";

interface GradientBarsProps {
  barCount?: number;
  mobileBarCount?: number;
  colors?: string[];
}

export const GradientBars = ({
  barCount = 20,
  mobileBarCount = 10,
  colors = ["#8f0feb", "transparent"],
}: GradientBarsProps) => {
  const gradientStyle = `linear-gradient(to top, ${colors.join(", ")})`;
  const effectiveBars = useIsMobile() ? mobileBarCount : barCount;

  const bars = useMemo(() => {
    return Array.from({ length: effectiveBars }).map((_, index) => {
      const position = index / (effectiveBars - 1);
      const center = 0.5;
      const distance = Math.abs(position - center);
      const scale = 0.3 + 0.7 * Math.pow(distance * 2, 1.2);

      return {
        index,
        scale,
        delay: index * 0.5,
      };
    });
  }, [effectiveBars]);

  return (
    <motion.div
      className="absolute inset-0 -z-10 rotate-180 overflow-hidden"
      exit="hidden"
      initial="hidden"
      animate="visible"
      variants={fadeSlideIn}
      transition={transition350}
    >
      <div className="flex h-full w-full opacity-50">
        {bars.map(({ index, scale, delay }) => {
          return (
            <motion.div
              key={`bg-bar-${index}`}
              className="flex-1 origin-bottom"
              style={{ background: gradientStyle }}
              animate={{
                scaleY: [scale, scale + 0.1, scale],
                opacity: [1, 0.95, 1],
              }}
              transition={{
                delay,
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
