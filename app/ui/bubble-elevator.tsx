"use client";

import { AnimatePresence, useAnimationFrame, useMotionValue, motion, useMotionValueEvent, useTime, useTransform, easeOut } from "motion/react";
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

function Bubble({
  top: rawTop,
  left,
  dim,
  clipPath,
  backgroundImage,
  riseDuration: rawRiseDuration,
  quay: key,
  onPopped,
}: BubbleProps & {
  riseDuration?: number;
  quay?: ComponentProps<"div">["key"];
  onPopped?: (key: ComponentProps<"div">["key"]) => void;
}) {
  const riseDuration = rawRiseDuration ?? 10000;
  const time = useTime();
  const top = useTransform(time, [0, riseDuration], [rawTop, 0], { clamp: false });
  const show = useTransform(() => 0 <= time.get() && time.get() < (riseDuration * 0.95));
  const rotate = useTransform(time, [0, riseDuration / 2], [0, 360], { clamp: false });

  useMotionValueEvent(time, "change", (latest) => {
    if (latest > riseDuration && onPopped) {
      onPopped(key);
    }
  });

  return <>
    {show && <motion.div
      className="absolute z-10 drop-shadow-lg/50 drop-shadow-white"
      style={{
        top,
        left,
        width: dim,
        height: dim,
        rotate,
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
      transition={{ ease: easeOut }}
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
  riseDuration: rawRiseDuration,
  maxBubbles: rawMaxBubbles,
  ...props
}: ComponentProps<"div"> & {
  ref?: React.RefObject<HTMLDivElement | null>;
  backgroundImages?: string[];
  riseDuration?: number;
  maxBubbles?: number;
}) {
  const riseDuration = rawRiseDuration ?? 10000;
  const maxBubbles = rawMaxBubbles ?? 16;
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
    if (bubbles.size < maxBubbles && (time - lastAddedTime) >= (riseDuration / maxBubbles)) {
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
          riseDuration={riseDuration}
          {...bubbleProps}
        ></Bubble>;
      })}
    </AnimatePresence>
  </div >;
}
