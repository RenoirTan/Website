"use client";

import { motion, MotionValue } from "motion/react";
import { twMerge } from "tailwind-merge";

export default function PinLabel({
  children,
  className,
  ...props
}: Parameters<typeof motion.div>[0]) {
  const c = (children instanceof MotionValue) ? <motion.span>{children}</motion.span> : children;
  return <motion.div
    {...props}
    className={twMerge(
      "text-xl italic",
      className
    )}
  >
    {c}
  </motion.div>;
}
