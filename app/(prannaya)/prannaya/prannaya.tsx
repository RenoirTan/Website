"use client";

import BubbleElevator from "@/app/ui/bubble-elevator";
import { CosineWave } from "@/app/ui/cosine";
import { useTime, useTransform, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

// https://tenor.com/view/angai313-spongebob-sad-spongebob-crying-gif-21679826
// https://cdn.britannica.com/22/4722-050-59D98A21/Republic-of-Georgia-boundaries-map-locator-cities.jpg

export default function PrannayaClient({
  bubbleBackgroundImages
}: { bubbleBackgroundImages?: string[]; }) {
  const time = useTime();
  const startAngle = useTransform(time, (t) => ((t / 2000) % 1) * 2 * Math.PI);
  const endAngle = useTransform(startAngle, (s) => s + 12 * Math.PI);
  const rotate = useTransform(time, [0, 2000], [0, 360], { clamp: false });
  const color = useTransform(rotate, (r) => `hsl(${r % 360}, 100%, 50%)`);

  const byebye = <motion.div className="text-5xl text-nowrap" style={{ rotate, color }}>Bye bye Prannay!</motion.div>;

  return <div
    className="min-h-screen relative bg-linear-to-b from-[60vh] to-[100vh] from-sky-300 to-blue-700 flex flex-col items-center"
  >
    <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
      <BubbleElevator className="w-full h-full" backgroundImages={bubbleBackgroundImages} />
    </div>
    <div className="h-[60vh] flex flex-col md:flex-row items-center justify-center gap-x-10">
      {byebye}
      <Image src="/static/others/spongebob-sad.gif" alt="" width={100} height={100} className="w-80 aspect-square" />
      {byebye}
    </div>
    <CosineWave className="w-screen h-[20px] md:h-[40px] bg-linear-to-r from-white/50 via-indigo-200/50 to-white/50" startAngle={startAngle} endAngle={endAngle} />
    <div className="min-h-[40vh] p-5 w-full md:w-[720px] flex flex-col items-center gap-y-5">
      <div className="flex flex-row gap-x-5 justify-center items-center">
        <p className="text-5xl">We will miss you!</p>
        <Image src="/static/others/thumbs-up.png" alt="" width={200} height={200} className="aspect-square" />
      </div>
      <Image src="/static/others/georgia.gif" alt="" width={200} height={200} className="w-80" />
      <p className="text-5xl">Have fun in Georgia!</p>
      <Link href="/">Home</Link>
    </div>
  </div>;
}
