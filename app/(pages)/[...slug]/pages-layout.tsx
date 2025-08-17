// https://vstollen.me/blog/advanced-mdx-layouts

"use client";

import { BsHouseFill } from "react-icons/bs";
import HorizontalFlyingButton from "../../ui/horizontal-flying-button";
import { usePathname } from "next/navigation";
import "../../globals.css";
import clsx from "clsx";

export default function PagesLayout({
  children,
  frontmatter
}: {
  children: React.ReactNode,
  frontmatter: any
}) {
  const pathname = usePathname();

  return <div className="w-full max-h-full flex flex-col items-center">
    <div className="p-1 flex flex-col w-full max-h-full gap-y-3 overflow-hidden">
      <div className="w-full px-2 md:px-5 py-2 absolute z-40 top-0 left-0 right-0">
        <div
          className={clsx(
            "flex flex-row justify-between gap-5 p-3",
            "border border-l-silver/20 rounded-2xl bg-l-dark-gray/50 backdrop-blur-md",
          )}
        >
          <HorizontalFlyingButton caption="Home" href="/">
            <BsHouseFill className="text-xl" />
          </HorizontalFlyingButton>
          <h2 className="truncate" style={{ direction: "rtl" }}>
            {pathname}
          </h2>
        </div>
      </div>
      <div className="flex flex-col w-full items-center max-h-full gap-y-3 overflow-y-auto pages-layout">
        <div className="flex flex-col gap-3 w-full mt-[3em] p-3 md:w-[720px] md:p-5">
          {children}
        </div>
      </div>
    </div>
  </div>
}