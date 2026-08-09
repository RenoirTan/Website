"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const SHAPE_CLIP_PATHS = {
  circle: "circle(50% at 50% 50%)",

  square: "inset(0)",

  star: `polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 100%,
    50% 74%,
    21% 100%,
    32% 57%,
    2% 35%,
    39% 35%
  )`,

  heart: `polygon(
    50% 100%,
    10% 55%,
    5% 35%,
    10% 18%,
    25% 8%,
    40% 12%,
    50% 25%,
    60% 12%,
    75% 8%,
    90% 18%,
    95% 35%,
    90% 55%
  )`,
};

type BubbleProps = {
  top: number;
  left: number;
  clipPath: string;
  backgroundImage: string;
};

export default function BubbleElevator(props: ComponentProps<"div"> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = props.ref ?? useRef<HTMLDivElement>(null);

  const [shapes, setShapes] = useState(new Map<string, BubbleProps>());
  const [size, setSize] = useState({ height: 1, width: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const updateSize = () => {
      const rect = ref.current!.getBoundingClientRect();
      setSize({ height: rect.height, width: rect.width });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    shapes.set("badKey", {
      top: 100,
      left: 100,
      clipPath: SHAPE_CLIP_PATHS.heart,
      backgroundImage: "url(\"static/prannaya/appv-tiktok.jpg\")",
    });
    setShapes(shapes);
  }, []);

  return <div
    {...props}
    ref={ref}
    className={twMerge("relative", props.className)}
  >
    {[...shapes].map(([key, bubbleProps]) => {
      return <div
        key={key}
        className="absolute bg-cover bg-center w-[100px] h-[100px]"
        style={{
          top: bubbleProps.top,
          left: bubbleProps.left,
          clipPath: bubbleProps.clipPath,
          backgroundImage: bubbleProps.backgroundImage,
        }}
      ></div>;
    })}
  </div>;
}
