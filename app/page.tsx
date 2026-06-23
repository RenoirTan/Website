"use client";

import { PageProvider } from "./providers";
import EyeOfTheStorm from "./ui/eye-of-the-storm";
import "./globals.css";
import { easeIn, motion, useScroll, useSpring, useTransform } from "motion/react";
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";
import { InACircle } from "./ui/in-a-circle";

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
  const { eotsScale } = useTransform(scrollY, [0, 600], {
    eotsScale: [1, 0.4],
  }, { ease: easeIn });
  const { planetsOpacity, planetsScale } = useTransform(useSpring(scrollY), [0, 600], {
    planetsOpacity: [0, 1],
    planetsScale: ["0%", "100%"],
  });

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
        <div className="w-full min-h-[calc(100vh+600px)]">

          <div className="sticky top-0 h-[calc(100vh-3rem)] overflow-hidden p-[2rem] w-full flex flex-col items-center">
            <div className="h-full flex flex-row items-center">
              <div className="relative">
                <motion.div style={{ scale: eotsScale }} className="relative z-50">
                  <EyeOfTheStorm onClick={goToEitherEnd} />
                </motion.div>

                <motion.div style={{ opacity: planetsOpacity }} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transform">
                  <motion.div style={{ width: planetsScale, height: planetsScale }} className="relative">
                    {
                      ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'].map((v, i) => {
                        const degrees = i * 45;
                        return <InACircle degrees={degrees}><p>{v}</p></InACircle>
                      })
                    }
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
