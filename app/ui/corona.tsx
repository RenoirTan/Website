import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Corona(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div
    {...props}
    style={{ ...props.style, "--tw-gradient-from-position": "0%" } as CSSProperties}
    className={twMerge(
      "absolute rounded-full blur-xl will-change-transform pointer-events-none",
      "bg-conic/oklch from-l-vermillion via-l-blue-violet to-l-vermillion",
      props.className
    )}
  >
    {props.children}
  </div>
}
