import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Corona(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div
    {...props}
    className={twMerge(
      "absolute rounded-full blur-xl will-change-transform pointer-events-none",
      "bg-conic/oklch from-l-vermillion via-l-blue-violet to-l-vermillion",
      props.className
    )}
  >
    {props.children}
  </div>
}
