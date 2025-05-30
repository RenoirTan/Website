"use client";

import { clsx } from "clsx";
import Cell from "./cell";
import { MouseEventHandler, useState } from "react";

export default function ButtonCell({
  children,
  caption,
  childYDisplacement,
  onClick
}: {
  children: React.ReactNode;
  caption: string;
  childYDisplacement?: string;
  onClick?: MouseEventHandler<HTMLDivElement>
}) {
  const [hovering, setHovering] = useState(false);

  const onMouseOut: MouseEventHandler = (e) => {
    setHovering(false);
  };

  const onMouseOver: MouseEventHandler = (e) => {
    setHovering(true);
  };

  // https://codepen.io/raposera/pen/ZYYbGjg
  return <Cell>
    <div
      className="max-w-full max-h-full w-fit h-fit aspect-square flex flex-col justify-center items-center gap-y-1 relative"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <div className={clsx(
        "transition-all duration-300 md:duration-500",
        !hovering && (childYDisplacement ?? "md:mt-[1rem]"),
        hovering && "mt-0"
      )}>
        {children}
      </div>
      <p className={clsx(
        "max-w-full text-sm text-nowrap truncate transition-opacity hidden md:inline-block duration-300 md:duration-500",
        !hovering && "opacity-0",
        hovering && "opacity-100"
      )}>{caption}</p>
    </div>
  </Cell>;
}