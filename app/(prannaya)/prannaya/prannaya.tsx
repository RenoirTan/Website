"use client";

import BubbleElevator from "@/app/ui/bubble-elevator";
import { CosineWave } from "@/app/ui/cosine";
import { useTime, useTransform } from "motion/react";

export default function PrannayaClient({
  bubbleBackgroundImages
}: { bubbleBackgroundImages?: string[]; }) {
  const time = useTime();
  const startAngle = useTransform(() => ((time.get() / 2000) % 1) * 2 * Math.PI);
  const endAngle = useTransform(() => startAngle.get() + 12 * Math.PI);

  return <div
    className="min-h-screen relative bg-linear-to-b to-[75vh] from-sky-300 to-blue-700"
  >
    <div className="absolute w-full h-full top-0 left-0">
      <BubbleElevator className="w-full h-full" backgroundImages={bubbleBackgroundImages} />
    </div>
    <div className="h-[80vh]">
      <h1>What</h1>
    </div>
    <CosineWave className="w-screen h-[20px] md:h-[40px] bg-linear-to-r from-white/50 via-sky-500/50 to-white/50" startAngle={startAngle} endAngle={endAngle} />
    <div className="h-[80vh]">
      <h1>What</h1>
    </div>
  </div>;
}
