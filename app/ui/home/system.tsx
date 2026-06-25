"use client";

import EyeOfTheStorm from "../eye-of-the-storm";
import { easeIn, motion, useAnimationFrame, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import React, { useEffect, useState } from "react";
import { InACircle } from "../in-a-circle";
import { BsLinkedin } from "react-icons/bs";
import Link from "next/link";
import { HiDocumentText } from "react-icons/hi2";
import Planet from "../planet";
import Image from "next/image";
import MailPlanet from "../mail-planet";
import { useDivScrollRestoration } from "@/lib/use-div-scroll-restoration";
import PromptClick from "../prompt-click";
import { usePathname } from "next/navigation";

export default function System({
  children,
  aboutMeRef,
}: {
  children?: React.ReactNode;
  aboutMeRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isConfused, setIsConfused] = useState(false);
  const containerRef = useDivScrollRestoration("home-scroll-pos", {
    beforeCallback: (ref) => {
      if (pathname === "/about-me") {
        aboutMeRef.current!.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  });
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

  // top of aboutMe relative to top of main container
  const aboutMeScrollY = useTransform(
    scrollY,
    (latest) => (aboutMeRef.current) ? latest - aboutMeRef.current.offsetTop : 0
  );

  useMotionValueEvent(aboutMeScrollY, "change", (latest) => {
    const previous = aboutMeScrollY.getPrevious();
    if (previous === undefined) return;
    if (latest >= 0 && previous < 0) {
      window.history.pushState(null, "", "/about-me");
    } else if (latest < 0 && previous >= 0) {
      window.history.pushState(null, "", "/");
    }
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

  useEffect(() => {
    const onScroll = () => {
      if (containerRef.current?.scrollTop ?? 0 > 0) {
        setHasScrolled(true);
      }
    };
    if (!hasScrolled) {
      containerRef.current?.addEventListener("scroll", onScroll);
    }

    return () => containerRef.current?.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const confusedHelper = () => {
      if (!hasScrolled) {
        setIsConfused(true);
      }
    };
    const timeout = setTimeout(confusedHelper, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const needsPrompting = isConfused && !hasScrolled;

  // The h-[calc(100vh-3rem)] comes from 2rem from between the viewport and the black box
  // Plus another 2*0.5rem from the p-2 inside the blackbox
  // Both can be found in app/layout.tsx

  return (
    <>
      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="w-full min-h-[calc(100vh+600px)]">

          <div className="sticky top-0 h-[calc(100vh-3rem)] overflow-hidden p-8 w-full flex flex-col items-center">
            <div className="h-full flex flex-row items-center">
              <div className="relative">
                <motion.div style={{ scale: eotsScale }} className="relative z-50">
                  <EyeOfTheStorm onClick={goToEitherEnd} />
                </motion.div>

                <div className="absolute left-1/2 top-1/2 transform -translate-1/2 scale-[500%] z-60 pointer-events-none">
                  <PromptClick visible={needsPrompting} />
                </div>

                <motion.div style={{ opacity: planetsOpacity }} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transform">
                  <motion.div style={{ width: planetsScale, height: planetsScale }} className="relative">
                    <InACircle degrees={useTransform(() => planetsOrbit.get())} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet tooltip="About Me">
                        <Link
                          href="/about-me"
                          scroll={false}
                          className="w-full h-full flex items-center justify-center"
                          onClick={onClickAbout}
                        >
                          <Image src="/person-circle.svg" alt="About Me" width={60} height={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={useTransform(() => planetsOrbit.get() + 72)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet tooltip="GitHub">
                        <Link href="https://github.com/RenoirTan" className="w-full h-full flex items-center justify-center">
                          <Image src="/github-mark-white.svg" alt="GitHub" width={60} height={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={useTransform(() => planetsOrbit.get() + 144)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet tooltip="Linkedin">
                        <Link href="https://www.linkedin.com/in/renoir-tan" className="w-full h-full flex items-center justify-center">
                          <BsLinkedin size={48} className="hover:brightness-[.8] duration-200 w-[32px] md:w-[48px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={useTransform(() => planetsOrbit.get() + 216)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Planet tooltip="Resume">
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
