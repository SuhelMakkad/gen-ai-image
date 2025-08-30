import { Transition, Variants } from "framer-motion";

export const transition: Transition = { duration: 0.35, ease: "easeInOut" };
export const transition250: Transition = { duration: 0.25, ease: "easeInOut" };
export const transition200: Transition = { duration: 0.2, ease: "easeInOut" };
export const transition150: Transition = { duration: 0.15, ease: "easeInOut" };

export const errorVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: { opacity: 1, transition: { duration: 0.1 } },
};

export const opacityFadeInOut: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleInOut: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};
