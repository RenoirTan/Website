"use client";

import { ComponentProps, useId, useLayoutEffect, useRef, useState } from "react";
import _ from "lodash";
import { twMerge } from "tailwind-merge";

// Extremely helpful website that gives an approximation (?) of a sine curve using cubic bezier
// http://www.dmitry.baranovskiy.com/sine.html
// The following path has 2 periods and is more like a cosine graph
const path = `M 0 0 C ${Math.PI - 2} 0, 2 1, ${Math.PI} 1 S ${Math.PI + 2} 0, ${2 * Math.PI} 0 S ${2 * Math.PI + 2} 1, ${3 * Math.PI} 1 S ${3 * Math.PI + 2} 0, ${4 * Math.PI} 0`;

export function CosineIcon(props: ComponentProps<"div"> & {
  strokeWidth?: number | undefined;
  offset?: number | undefined;
}) {
  const {
    strokeWidth,
    offset: rawOffset,
    ...restProps
  } = _.defaults({ ...props }, {
    strokeWidth: 3,
    offset: 0,
  });
  const offset = rawOffset % (2 * Math.PI);

  const id = useId();
  const divRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!divRef.current) return;

    const updateSize = () => {
      const { width, height } = divRef.current!.getBoundingClientRect();

      setSize({ width, height });
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
    const endTheta = 2 * Math.PI + extension;
    // minus off some y from the top and bottom so the curve doesn't get cut off
    const yExtent = (height - strokeWidth) / 2;
    const yMid = height / 2;
    const points = Array.from({ length: samples + 1 }, (_, i) => {
      const theta = startTheta + (endTheta - startTheta) * (i / samples);
      const svgX = (theta / (2 * Math.PI)) * width;
      const svgY = yMid - yExtent * Math.sin(theta);
      return `${svgX.toFixed(3)},${svgY.toFixed(3)}`;
    });
    return `M ${points.join(" L ")}`;
  }, [height, width, strokeWidth]);
  */


  // const path = " M -20 126 C -10 105, -5 100, 0 100 C 50 33, 100 33, 150 100 C 200 167, 250 167, 300 100 C 305 100, 310 95, 320 74 ";

  const overflowY = strokeWidth / size.height;

  return <>
    <svg width="0" height="0" aria-hidden="true">
      <defs>
        <mask
          id={id}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <svg
            x="0"
            y="0"
            width={size.width}
            height={size.height}
            viewBox={`0 ${-overflowY} ${4 * Math.PI} ${1 + 2 * overflowY}`}
            preserveAspectRatio="none"
            overflow="visible"
          >
            <path
              d={path}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth}
              strokeLinecap="square"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </mask>
      </defs>
    </svg>

    <div
      ref={divRef}
      style={{ mask: `url(#${id})` }}
      {...props}
      className={twMerge("bg-red-500", props.className)}
    >
      Fuck
    </div>
  </>;
}
