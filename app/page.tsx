"use client";

import { PageProvider } from "./providers";
import EyeOfTheStorm from "./ui/eye-of-the-storm";
import "./globals.css";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Home() {
  return <PageProvider>
    <NewHomePage />
  </PageProvider>;
}

export function NewHomePage() {
  // TODO: replace <any> with actual type definition
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });
  const scale = useTransform(scrollY, [0, 600], [1, 0.4]);

  const goToEitherEnd = () => {
    const elem = containerRef.current!;
    if (elem.scrollTop >= 150) {
      elem.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      elem.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  // The h-[calc(100vh-3rem)] comes from 2rem from between the viewport and the black box
  // Plus another 2*0.5rem from the p-2 inside the blackbox
  // Both can be found in app/layout.tsx

  return (
    <>
      <div ref={containerRef} className="w-full h-full overflow-y-scroll">
        <div className="w-full h-[500vh]">
          <div className="sticky top-0 h-[calc(100vh-3rem)] overflow-hidden p-[2rem] flex flex-col items-center">
            <motion.div style={{ scale }} className="h-full flex flex-row items-center">
              <EyeOfTheStorm onClick={goToEitherEnd} />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
