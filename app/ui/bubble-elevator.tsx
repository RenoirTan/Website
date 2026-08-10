"use client";

import { AnimatePresence, useAnimationFrame, useMotionValue, motion, useMotionValueEvent, useTime, useTransform } from "motion/react";
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
} as const;
const SHAPES = Object.keys(SHAPE_CLIP_PATHS) as (keyof typeof SHAPE_CLIP_PATHS)[];

type BubbleProps = {
  top: number;
  left: number;
  dim: number;
  clipPath: string;
  backgroundImage: string;
};

const RISE_TIME = 10000;
const DISAPPEAR_TIME = 9600;

function Bubble({
  top: rawTop,
  left,
  dim,
  clipPath,
  backgroundImage,
  quay: key,
  onPopped,
}: BubbleProps & {
  quay?: ComponentProps<"div">["key"];
  onPopped?: (key: ComponentProps<"div">["key"]) => void;
}) {
  const time = useTime();
  const top = useTransform(time, [0, RISE_TIME], [rawTop, 0], { clamp: false });
  const show = useTransform(() => 0 <= time.get() && time.get() < DISAPPEAR_TIME);

  useMotionValueEvent(time, "change", (latest) => {
    if (latest > RISE_TIME && onPopped) {
      onPopped(key);
    }
  });

  return <>
    {show && <motion.div
      className="absolute z-10 drop-shadow-lg/50 drop-shadow-red-500"
      style={{
        top,
        left,
        width: dim,
        height: dim,
      }}
      initial={{
        opacity: 0,
        scale: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        scale: 1.5,
      }}
    >
      <div
        className="relative w-full h-full bg-cover bg-center"
        style={{
          clipPath,
          backgroundImage,
        }}
      >
      </div>
    </motion.div>}
  </>
}

export default function BubbleElevator({
  backgroundImages: rawBackgroundImages,
  ...props
}: ComponentProps<"div"> & {
  ref?: React.RefObject<HTMLDivElement | null>;
  backgroundImages?: string[];
}) {
  const backgroundImages = rawBackgroundImages ?? [];
  const ref = props.ref ?? useRef<HTMLDivElement>(null);

  const [lastAddedTime, setLastAddedTime] = useState(0);
  const [bubbles, setBubbles] = useState(new Map<string, BubbleProps>());
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
  const onPopped = (key: ComponentProps<"div">["key"]) => {
    if (typeof key === "string") {
      bubbles.delete(key)
      setBubbles(bubbles);
    }
  };

  useAnimationFrame((time, delta) => {
    if (bubbles.size < 32 && (time - lastAddedTime) >= 1000) {
      const dim = 75 + Math.random() * 50;
      bubbles.set(`bubble-${time}`, {
        top: size.height,
        left: Math.random() * (size.width - dim),
        dim,
        clipPath: SHAPE_CLIP_PATHS[SHAPES[Math.floor(Math.random() * 4)]],
        backgroundImage: backgroundImages[Math.floor(Math.random() * backgroundImages.length)],
      });
      setLastAddedTime(time);
    }
    setBubbles(bubbles);
  });

  return <div
    {...props}
    ref={ref}
    className={twMerge("relative overflow-clip", props.className)}
  >
    <AnimatePresence>
      {[...bubbles].map(([key, bubbleProps]) => {
        return <Bubble
          quay={key}
          key={key}
          onPopped={onPopped}
          {...bubbleProps}
        ></Bubble>;
      })}
    </AnimatePresence>
  </div >;
}
