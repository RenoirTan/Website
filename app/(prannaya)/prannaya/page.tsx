"use client";

import { CosineIcon } from "@/app/ui/icons/cosine";
import { useTime, useTransform } from "motion/react";

export default function Prannaya() {
  const time = useTime();
  const startAngle = useTransform(() => ((time.get() / 2000) % 1) * 2 * Math.PI);
  const endAngle = useTransform(() => startAngle.get() + 12 * Math.PI);

  return <div className="min-h-screen bg-linear-to-b to-[75vh] from-sky-300 to-blue-700">
    <h1>What</h1>
    <div className="flex flex-row">
      <CosineIcon className="w-screen h-[20px] md:h-[40px] bg-linear-to-r from-red-500 via-green-500 to-purple-500" startAngle={startAngle} endAngle={endAngle} strokeWidth={6.7} />
    </div>
  </div>;
}
