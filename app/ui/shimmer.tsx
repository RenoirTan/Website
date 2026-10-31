import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Shimmer(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div
    {...props}
    className={twMerge(
      "overflow-hidden flex items-center justify-center @container",
      props.className
    )}
  >
    <div className={twMerge(
      "bg-white min-h-[150cqmax] min-w-[150cqmax] animate-[spin_5s_linear_infinite]",
      "bg-linear-to-br from-25% from-[#7e2e38] to-75% to-[#631e57]"
    )}>
      {props.children}
    </div>
  </div>;
}
