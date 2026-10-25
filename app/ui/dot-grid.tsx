import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type DotGridProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  dotSeparation?: string;
  dotRadius?: string;
  dotColor?: string;
};

// https://stackoverflow.com/a/55364821
export default function DotGrid({
  dotSeparation,
  dotRadius,
  dotColor,
  ...props
}: DotGridProps) {
  const dotSep = dotSeparation ?? "40px";
  const initBackgroundSize = `${dotSep}`;
  const backgroundSize = `${initBackgroundSize} ${initBackgroundSize}`;
  const xOffset = `calc(mod(100cqw, ${dotSep}) / 2)`;
  const yOffset = `calc(mod(100cqh, ${dotSep}) / 2)`;

  return <div
    {...props}
    className={twMerge(
      "@container absolute pointer-events-none w-full h-full top-1/2 left-1/2 -translate-1/2",
      props.className,
    )}
  >
    <div
      className={twMerge("w-full h-full")}
      style={{
        backgroundImage: `radial-gradient(circle at ${xOffset} ${yOffset}, ${dotColor ?? "gray"} ${dotRadius ?? "1px"}, transparent 0)`,
        backgroundSize: backgroundSize,
      }}
    >
      {props.children}
    </div>
  </div>
}
