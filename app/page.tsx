"use client";

import clsx from "clsx";
import { PageProvider, usePageContext } from "./providers";
import EyeOfTheStorm from "./ui/eye-of-the-storm";
import HelloText from "./ui/hello-text";
import AbsoluteCenter from "./ui/absolute-center";
import Shelf from "./ui/shelf";
import "./globals.css";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export default function Home() {
  return <PageProvider>
    <NewHomePage />
  </PageProvider>;
}

export function NewHomePage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });
  const scale = useTransform(scrollY, [0, 500], [1, 0.5]);

  // The h-[calc(100vh-3rem)] comes from 2rem from between the viewport and the black box
  // Plus another 2*0.5rem from the p-2 inside the blackbox
  // Both can be found in app/layout.tsx

  return (
    <>
      <div ref={containerRef} className="w-full h-full overflow-y-scroll">
        <div className="w-full h-[500vh]">
          <div className="sticky top-0 h-[calc(100vh-3rem)] overflow-hidden p-[2rem] flex flex-col items-center">
            <motion.div style={{ scale }} className="h-full flex flex-row items-center">
              <EyeOfTheStorm />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

function HomePage() {
  const { eotsPressed, setEotsPressed } = usePageContext();

  return (
    <>
      <AbsoluteCenter className={clsx(
        "z-10",
      )}>
        <div className={clsx(
          "flex flex-col items-center mx-auto my-auto duration-300 md:duration-500",
        )}>
          <div className="w-3/5 flex flex-col items-center">
            {!eotsPressed && <EyeOfTheStorm />}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: (eotsPressed ? 0 : 1),
              transition: {
                duration: (eotsPressed ? 0 : 0.3),
                delay: (eotsPressed ? 0 : 0.2),
              },
            }}
            className="md:mx-6"
          >
            <HelloText />
          </motion.div>
        </div>
      </AbsoluteCenter>

      <AbsoluteCenter
        className={clsx(!eotsPressed && "z-0", eotsPressed && "z-10")}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: (eotsPressed ? 1 : 0),
            transition: {
              duration: 0.2,
            }
          }}
          className={clsx(
            "mx-auto my-auto"
          )}
        >
          <Shelf />
        </motion.div>
      </AbsoluteCenter>
    </>
  );
}
