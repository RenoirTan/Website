// https://vstollen.me/blog/advanced-mdx-layouts

"use client";

import { BsHouseFill } from "react-icons/bs";
import HorizontalFlyingButton from "../../ui/horizontal-flying-button";
import { usePathname } from "next/navigation";
import "../../globals.css";

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
      <div className="flex flex-row justify-between gap-5 p-2">
        <HorizontalFlyingButton caption="Home" href="/">
          <BsHouseFill className="text-xl" />
        </HorizontalFlyingButton>
        <h2 className="truncate" style={{ direction: "rtl" }}>
          {pathname}
        </h2>
      </div>
      <div className="flex flex-col w-full items-center max-h-full gap-y-3 overflow-y-auto pages-layout">
        <div className="flex flex-col gap-3 w-full p-3 md:w-[720px] md:p-5">
          {children}
        </div>
      </div>
    </div>
  </div>
}