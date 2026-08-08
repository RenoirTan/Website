import { SVGProps, useMemo } from "react";
import _ from "lodash";

export function SineIcon(props: SVGProps<SVGSVGElement>) {
  const {
    height,
    width,
    strokeWidth,
    ...restProps
  } = _.defaults({ ...props }, {
    height: 40,
    width: 160,
    strokeWidth: 3,
  });
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

  // const path = " M -20 126 C -10 105, -5 100, 0 100 C 50 33, 100 33, 150 100 C 200 167, 250 167, 300 100 C 305 100, 310 95, 320 74 ";

  return <svg xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    fill="none"
    stroke="black"
    stroke-width={strokeWidth}
    {...restProps}
  >

    <path d={path} />
  </svg>
}
