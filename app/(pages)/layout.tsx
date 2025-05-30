"use client";

import { BsArrowLeft } from "react-icons/bs";
import HorizontalFlyingButton from "../ui/horizontal-flying-button";
import { usePathname } from "next/navigation";
import "../globals.css";

export default function PagesLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return <div className="w-full max-h-full flex flex-col items-center">
    <div className="p-1 md:w-[720px] md:p-5 flex flex-col w-full max-h-full gap-y-3 overflow-hidden">
      <div className="flex flex-row justify-between">
        <HorizontalFlyingButton caption="Back" href="/">
          <BsArrowLeft className="text-xl" />
        </HorizontalFlyingButton>
        <h2>{pathname}</h2>
      </div>
      <div className="flex flex-col w-full max-h-full gap-y-3 overflow-y-auto pages-layout">
        {children}
      </div>
    </div>
  </div>
}