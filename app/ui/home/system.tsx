"use client";

import EyeOfTheStorm from "../eye-of-the-storm";
import { easeIn, motion, useAnimationFrame, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { InACircle } from "../in-a-circle";
import { BsLinkedin } from "react-icons/bs";
import Link from "next/link";
import { HiDocumentText } from "react-icons/hi2";
import Planet from "../planet";
import Image from "next/image";
import MailPlanet from "../mail-planet";

export default function System({
  children,
  aboutMeRef,
}: {
  children?: React.ReactNode;
  aboutMeRef: React.RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbitalSpeed = useSpring(1, { bounce: 0, duration: 1500 });
  const time = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    time.set(time.get() + delta * orbitalSpeed.get());
  });
  const planetsOrbit = useTransform(time, [0, 24000], [0, -360], { clamp: false });
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

  const onMouseEnter = () => {
    orbitalSpeed.set(0);
  };

  const onMouseLeave = () => {
    orbitalSpeed.set(1);
  }

  const onClickAbout = () => {
    aboutMeRef.current!.scrollIntoView({
      behavior: "smooth",
    });
  };

  // The h-[calc(100vh-3rem)] comes from 2rem from between the viewport and the black box
  // Plus another 2*0.5rem from the p-2 inside the blackbox
  // Both can be found in app/layout.tsx

  return (
    <>
      <div ref={containerRef} className="w-full h-full overflow-y-scroll">
        <div className="w-full min-h-[calc(100vh+600px)]">

          <div className="sticky top-0 h-[calc(100vh-3rem)] overflow-hidden p-8 w-full flex flex-col items-center">
            <div className="h-full flex flex-row items-center">
              <div className="relative">
                <motion.div style={{ scale: eotsScale }} className="relative z-50">
                  <EyeOfTheStorm onClick={goToEitherEnd} />
                </motion.div>

                <motion.div style={{ opacity: planetsOpacity }} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transform">
                  <motion.div style={{ width: planetsScale, height: planetsScale }} className="relative">
                    <InACircle degrees={useTransform(() => planetsOrbit.get())} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet>
                        <Link
                          href="/#about-me"
                          scroll={false}
                          className="w-full h-full flex items-center justify-center"
                          onClick={onClickAbout}
                        >
                          <Image src="/person-circle.svg" alt="About Me" width={60} height={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={useTransform(() => planetsOrbit.get() + 72)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet>
                        <Link href="https://github.com/RenoirTan" className="w-full h-full flex items-center justify-center">
                          <Image src="/github-mark-white.svg" alt="GitHub" width={60} height={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={useTransform(() => planetsOrbit.get() + 144)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet>
                        <Link href="https://www.linkedin.com/in/renoir-tan" className="w-full h-full flex items-center justify-center">
                          <BsLinkedin size={48} className="hover:brightness-[.8] duration-200 w-[32px] md:w-[48px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={useTransform(() => planetsOrbit.get() + 216)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet>
                        <Link href="/resume.pdf" className="w-full h-full flex items-center justify-center">
                          <HiDocumentText size={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={useTransform(() => planetsOrbit.get() + 288)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onMouseLeave}>
                      <MailPlanet />
                    </InACircle>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  )
}
