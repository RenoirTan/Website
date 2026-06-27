import { clsx } from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export function Layout({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div
    {...props}
    className={clsx(props.className, "flex flex-col gap-3")}
  >
    {children}
  </div>
}
