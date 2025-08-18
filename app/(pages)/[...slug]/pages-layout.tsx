// https://vstollen.me/blog/advanced-mdx-layouts

"use client";

import { BsHouseFill } from "react-icons/bs";
import HorizontalFlyingButton from "../../ui/horizontal-flying-button";
import { usePathname } from "next/navigation";
import "../../globals.css";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "motion/react";

export default function PagesLayout({
  children,
  frontmatter
}: {
  children: React.ReactNode,
  frontmatter: any
}) {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const topBarTopState = {
    borderColor: "rgb(215 215 215 / 0)",
    backgroundColor: "rgb(40 36 40 / 0)",
  };
  const topBarAnimationState = (scrollY === 0)
    ? topBarTopState
    : {
      borderColor: "rgb(215 215 215 / 0.2)",
      backgroundColor: "rgb(40 36 40 / 0.5)",
    };

  return <div className="w-full max-h-full flex flex-col items-center">
    <div className="p-1 flex flex-col w-full max-h-full gap-y-3 overflow-hidden">
      <div className="w-full px-2 py-2 absolute z-40 top-0 left-0 right-0 flex flex-col items-center">
        <motion.div
          className={clsx(
            "flex flex-row justify-between gap-5 p-3 w-full md:w-[720px] rounded-2xl border backdrop-blur-md",
            // scrollY !== 0 && "border-l-silver/20 bg-l-dark-gray/50",
            // scrollY === 0 && "border-transparent bg-transparent",
          )}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
          initial={topBarTopState}
          animate={topBarAnimationState}
        >
          <HorizontalFlyingButton caption="Home" href="/">
            <BsHouseFill className="text-xl" />
          </HorizontalFlyingButton>
          <h2 className="truncate" style={{ direction: "rtl" }}>
            {pathname}
          </h2>
        </motion.div>
      </div>
      <div
        className="flex flex-col w-full items-center max-h-full gap-y-3 overflow-y-auto pages-layout"
        onScroll={e => setScrollY((e.target as HTMLElement).scrollTop)}
      >
        <div
          className="flex flex-col gap-3 w-full mt-[2.5em] p-3 md:w-[720px] md:p-5"
        >
          {children}
        </div>
      </div>
    </div>
  </div>
}