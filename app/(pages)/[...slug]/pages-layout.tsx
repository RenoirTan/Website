// https://vstollen.me/blog/advanced-mdx-layouts

"use client";

import { BsArrowLeft } from "react-icons/bs";
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
      <div className="flex flex-row justify-between">
        <HorizontalFlyingButton caption="Back" href="/">
          <BsArrowLeft className="text-xl" />
        </HorizontalFlyingButton>
        {<h2>{pathname}</h2>}
      </div>
      <div className="flex flex-col w-full items-center max-h-full gap-y-3 overflow-y-auto pages-layout">
        <div className="flex flex-col gap-3 w-full md:w-[720px] md:p-5">
          {children}
        </div>
      </div>
    </div>
  </div>
}