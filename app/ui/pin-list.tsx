"use client";

import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export default function({
  children,
  className,
  ...props
}: Parameters<typeof motion.div>[0]) {
  return <motion.div
    {...props}
    className={twMerge(
      "w-full h-fit flex flex-row flex-wrap gap-x-2 gap-y-2",
      className
    )}
  >
    {children}
  </motion.div>;
}
