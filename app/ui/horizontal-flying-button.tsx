"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function HorizontalFlyingButton({
  children,
  caption,
  href
} : {
  children?: React.ReactNode;
  caption: string;
  href?: string;
}) {
  const [hovering, setHovering] = useState(false);

  const base = <div
    className="flex flex-row align-middle items-center gap-x-3"
    onMouseOver={() => setHovering(true)}
    onMouseOut={() => setHovering(false)}
  >
    {children}
    {caption && <span
      className={clsx(
        "text-left align-center transition-all md:duration-500",
        !hovering && "md:opacity-0 md:-translate-x-10",
        hovering && "opacity-100 md:translate-x-0"
      )}
    >
      {caption}
    </span>}
  </div>;

  return href ? <Link href={href}>{base}</Link> : base;
}