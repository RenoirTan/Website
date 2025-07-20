"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { usePageContext } from "../providers";

export default function EyeOfTheStorm({
  size,
  layoutId,
  className,
}: {
  size?: number;
  layoutId?: string;
  className?: string;
}) {
  const sizeUsed = size ?? 600;
  const { eotsPressed, setEotsPressed } = usePageContext();

  // https://www.kindacode.com/article/react-get-the-position-x-y-of-an-element/
  const imgRef = useRef<HTMLDivElement>(null);

  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      ref={imgRef}
      layoutId={layoutId ?? "eye-of-the-storm"}
      className={clsx("h-fit w-fit", className)}
    >
      <Image
        className={clsx(
          "duration-300 md:duration-500 rounded-full animate-[corona_20s_linear_infinite]",
          "bg-black hover:brightness-75",
        )}
        src="/icon-v2-exported.svg"
        alt="Eye of the Storm"
        height={sizeUsed}
        width={sizeUsed}
        quality={100}
        style={{objectFit: "contain"}}
        draggable={false}
        priority
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
        onClick={() => {
          setEotsPressed(!eotsPressed);
        }}
      />
    </motion.div>
  );
}