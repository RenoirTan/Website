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
      "w-[60px] md:w-[100px] aspect-square rounded-full inline-block overflow-hidden",
      "duration-300",
      "bg-indigo-950  inset-shadow-sm inset-shadow-indigo-800 hover:shadow-lg hover:shadow-purple-500/50"
    )}
  >
    {children}
  </div>;
}
