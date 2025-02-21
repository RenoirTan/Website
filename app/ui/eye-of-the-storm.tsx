"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

export default function EyeOfTheStorm({
  pressed,
  setPressed
}: {
  pressed?: boolean;
  setPressed: (pressed: boolean) => void;
}) {
  // https://www.kindacode.com/article/react-get-the-position-x-y-of-an-element/
  const imgRef = useRef<HTMLDivElement>(null);

  const [hovering, setHovering] = useState(false);

  return (
    <div ref={imgRef} className="h-fit w-fit">
      <Image
        className={clsx(
          "duration-300 md:duration-500 rounded-full shadow-xl shadow-orange-800 bg-black",
          ((hovering && !pressed) &&
            "-rotate-12 md:-rotate-45 brightness-110 scale-110 shadow-rose-500"),
          pressed && "scale-[0.1] md:scale-[0.25]"
        )}
        src="/icon.png"
        alt="Eye of the Storm"
        height={600}
        width={600}
        quality={100}
        style={{objectFit: "contain"}}
        draggable={false}
        priority
        onMouseMove={function (e) {
          const rectangle = e.currentTarget.getBoundingClientRect();
          const width = rectangle.width;
          const height = rectangle.height;
          const x = rectangle.left + (width / 2);
          const y = rectangle.top + (height / 2);
          const mx = e.pageX - x;
          const my = e.pageY - y;
          const dx = mx / width;
          const dy = my / height;
          const sdfo = (dx * dx) + (dy * dy);
          /*
          const debug = {
            x: x,
            y: y,
            width: width,
            height: height,
            mx: mx,
            my: my,
            dx: dx,
            dy: dy,
            sdfo: sdfo
          };
          console.log(`${JSON.stringify(debug)}`);
          */
          if (sdfo <= 0.25) {
            setHovering(true);
          } else {
            setHovering(false);
          }
        }}
        onMouseOut={() => setHovering(false)}
        onClick={() => {
          setHovering(false);
          setPressed(!pressed);
        }}
      />
    </div>
  );
}