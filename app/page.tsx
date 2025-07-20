"use client";

import clsx from "clsx";
import { PageProvider, usePageContext } from "./providers";
import EyeOfTheStorm from "./ui/eye-of-the-storm";
import HelloText from "./ui/hello-text";
import AbsoluteCenter from "./ui/absolute-center";
import Shelf from "./ui/shelf";
import "./globals.css";
import { motion } from "motion/react";
import { useEffect } from "react";

export function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageProvider>
    {children}
  </PageProvider>
}

export function HomePage() {
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

export default function Home() {
  return <HomeLayout>
    <HomePage />
  </HomeLayout>;
}