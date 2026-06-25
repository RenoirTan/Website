import { Tooltip } from "@/chakra/ui/tooltip";
import { clsx } from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Planet({
  children,
  className,
  tooltip,
  tooltipClassName,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  tooltip?: string;
  tooltipClassName?: string;
}) {
  return <Tooltip
    onOpenChange={(details) => {
      console.log("dialog open change", details)
    }}
    content={tooltip}
    contentProps={{
      className: clsx("bg-fuchsia-900/50 text-inherit text-xl", tooltipClassName)
    }}
  >
    <div
      {...props}
      className={clsx(
        className,
        "w-[60px] md:w-[100px] aspect-square rounded-full inline-block overflow-hidden",
        "duration-300",
        "bg-indigo-950 inset-shadow-sm inset-shadow-indigo-800 hover:shadow-lg hover:shadow-purple-500/50"
      )}
    >
      {children}
    </div>
  </Tooltip >;
}
