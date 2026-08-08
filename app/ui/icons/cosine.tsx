"use client";

import { MotionValue, motion, useMotionTemplate, useTransform } from "motion/react";
import { useMotionValue } from "motion/react";
import { ComponentProps, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const TAU = 2 * Math.PI;

// Extremely helpful website that gives an approximation (?) of a sine curve using cubic bezier
// http://www.dmitry.baranovskiy.com/sine.html
// The following path has 2 periods and is more like a cosine graph
// const path = `M 0 0 C ${Math.PI - 2} 0, 2 1, ${Math.PI} 1 S ${Math.PI + 2} 0, ${TAU} 0 S ${2 * Math.PI + 2} 1, ${3 * Math.PI} 1 S ${3 * Math.PI + 2} 0, ${4 * Math.PI} 0`;

// The following function calculates a cosine path for n >= 1 periods
const firstPeriod = `M 0 0 C ${Math.PI - 2} 0, 2 1, ${Math.PI} 1 S ${Math.PI + 2} 0, ${TAU} 0`;
function calculateCosinePath(periods: number): string {
  if (periods <= 0) return "";
  let result = firstPeriod;
  for (let i = 1; i < periods; i++) {
    const j = i * 2;
    result = `${result} S ${j * Math.PI + 2} 1, ${(j + 1) * Math.PI} 1 S ${(j + 1) * Math.PI + 2} 0, ${(j + 2) * Math.PI} 0`;
  }
  return result;
}

export function CosineIcon(props: ComponentProps<"div"> & {
  strokeWidth?: number | string | MotionValue<number> | undefined;
  startAngle?: number | string | MotionValue<number> | undefined;
  endAngle?: number | string | MotionValue<number> | undefined;
}) {
  const {
    strokeWidth: rawStrokeWidth,
    startAngle: _rawStartAngle,
    endAngle: _rawEndAngle,
    ...restProps
  } = props;

  const strokeWidth = rawStrokeWidth instanceof MotionValue ? rawStrokeWidth : useMotionValue(+(rawStrokeWidth ?? 3));
  const rawStartAngle = _rawStartAngle instanceof MotionValue ? _rawStartAngle : useMotionValue(+(_rawStartAngle ?? 0));
  const rawEndAngle = _rawEndAngle instanceof MotionValue ? _rawEndAngle : useTransform(() => +(_rawEndAngle ?? (rawStartAngle.get() + TAU)));

  const minAngle = useTransform(() => Math.min(rawStartAngle.get(), rawEndAngle.get()));
  const maxAngle = useTransform(() => Math.max(rawStartAngle.get(), rawEndAngle.get()))

  const periods = useTransform(() => Math.ceil((maxAngle.get() - minAngle.get()) / TAU) + 1);
  const shiftedPeriods = useTransform(() => Math.floor(minAngle.get() / TAU));
  const startAngle = useTransform(() => minAngle.get() - shiftedPeriods.get() * TAU);
  const endAngle = useTransform(() => maxAngle.get() - shiftedPeriods.get() * TAU);
  const path = useTransform(() => calculateCosinePath(periods.get()));

  const [size, setSize] = useState({ width: 200, height: 40 });

  const id = useId();
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!divRef.current) return;
    const updateSize = () => {
      const rect = divRef.current!.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(divRef.current);
    return () => observer.disconnect();
  }, []);

  /*
  const path = useMemo(() => {
    // One period = 2π
    // Extend beyond both edges so adjacent waves can overlap.
    const extension = 0.2;
    const samples = 256;
    const startTheta = -extension;
    const endTheta = TAU + extension;
    // minus off some y from the top and bottom so the curve doesn't get cut off
    const yExtent = (height - strokeWidth) / 2;
    const yMid = height / 2;
    const points = Array.from({ length: samples + 1 }, (_, i) => {
      const theta = startTheta + (endTheta - startTheta) * (i / samples);
      const svgX = (theta / (TAU)) * width;
      const svgY = yMid - yExtent * Math.sin(theta);
      return `${svgX.toFixed(3)},${svgY.toFixed(3)}`;
    });
    return `M ${points.join(" L ")}`;
  }, [height, width, strokeWidth]);
  */


  // const path = " M -20 126 C -10 105, -5 100, 0 100 C 50 33, 100 33, 150 100 C 200 167, 250 167, 300 100 C 305 100, 310 95, 320 74 ";

  const overflowY = useTransform(() => strokeWidth.get() / size.height);
  const viewBox = useTransform(() => `${startAngle.get()} ${-overflowY.get()} ${endAngle.get() - startAngle.get()} ${1 + 2 * overflowY.get()}`);

  return <>
    <svg width="0" height="0" aria-hidden="true">
      <defs>
        <mask
          id={id}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <motion.svg
            x="0"
            y="0"
            width={size.width}
            height={size.height}
            viewBox={viewBox}
            preserveAspectRatio="none"
            overflow="visible"
          >
            <motion.path
              d={path}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth}
              strokeLinecap="square"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>
        </mask>
      </defs>
    </svg>

    <div
      ref={divRef}
      style={{ mask: `url(#${id})` }}
      {...restProps}
      className={twMerge("bg-red-500", props.className)}
    >
    </div>
  </>;
}
