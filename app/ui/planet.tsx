import { clsx } from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Planet({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div
    {...props}
    className={clsx(
      className,
      "w-[60px] md:w-[100px] aspect-square bg-indigo-950 rounded-full inline-block overflow-hidden",
      "shadow-inner shadow-red-500 hover:shadow-md hover:shadow-violet-500/50"
    )}
  >
    {children}
  </div>;
}
