"use client";

import { motion } from "motion/react";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function PinCategory({
  children,
  className,
  label,
  ...props
}: Parameters<typeof motion.div>[0] & {
  label: React.ReactNode,
}) {
  return <motion.div
    {...props}
    className={twMerge(
      "flex flex-row items-center w-full h-fit gap-x-3",
      className
    )}
  >
    <>
      {label}
      {children}
    </>
  </motion.div>;
}
