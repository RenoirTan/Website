"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { usePageContext } from "../providers";

export default function EyeOfTheStorm() {
  const { eotsPressed, setEotsPressed } = usePageContext();

  // https://www.kindacode.com/article/react-get-the-position-x-y-of-an-element/
  const imgRef = useRef<HTMLDivElement>(null);

  const [hovering, setHovering] = useState(false);

  return (
    <div ref={imgRef} className="h-fit w-fit">
      <Image
        className={clsx(
          "duration-300 md:duration-500 rounded-full animate-[corona_20s_linear_infinite] bg-black",
          hovering && "-rotate-12 md:-rotate-45 brightness-110 scale-110"
        )}
        src="/icon-v2-exported.svg"
        alt="Eye of the Storm"
        height={600}
        width={600}
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
    </div>
  );
}