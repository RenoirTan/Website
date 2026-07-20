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
import PromptText from "../prompt-text";

const ORBITAL_PERIOD = 24000;
const HIDING_TIME = 1000;
const EOTS_HEIGHT = 600;
const EOTS_HIDE = 900;
const PLANET_OFFSETS = [0, 72, 144, 216, 288];

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
  const { scrollY } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });
  const orbitalSpeed = useSpring(1, { bounce: 0, duration: 1500 });
  const orbitalRawHide = useTransform(() => scrollY.get() >= EOTS_HIDE);
  const orbitalHide = useMotionValue(orbitalRawHide.get());
  const hiddenSince = useMotionValue(0);
  const orbitalProgress = useMotionValue(0);
  useMotionValueEvent(orbitalRawHide, "change", (latest) => {
    const hiddenTime = hiddenSince.get();
    if (latest) {
      orbitalHide.set(true);
      // only unhide if the hiding sequence is completed
    } else if (!latest && hiddenTime >= HIDING_TIME) {
      orbitalHide.set(false);
      hiddenSince.set(0);
    }
  });
  useMotionValueEvent(hiddenSince, "change", (latest) => {
    const rawHide = orbitalRawHide.get();
    // same thing, only unhide if the hiding sequence is completed
    if (latest >= HIDING_TIME && !rawHide) {
      orbitalHide.set(false);
      hiddenSince.set(0);
    }
  });
  useMotionValueEvent(orbitalHide, "change", (latest) => {
    if (!latest) {
      hiddenSince.set(0);
    }
  });
  useAnimationFrame((_, delta) => {
    orbitalProgress.set(
      (orbitalProgress.get() + delta * orbitalSpeed.get() * Number(!orbitalHide.get())) % ORBITAL_PERIOD
    );
    if (orbitalHide.get()) {
      hiddenSince.set(Math.min(hiddenSince.get() + delta, HIDING_TIME));
    }
  });
  const planetsOrbit = useTransform(orbitalProgress, [0, ORBITAL_PERIOD], [0, -360], { clamp: false });
  const planetHideAngleThreshold = PLANET_OFFSETS.map((d) => {
    return useTransform(() => {
      const angle = planetsOrbit.get() + d;
      // -90 degrees means that the threshold is on the west side of EOTS
      const threshold = Math.floor((angle + 90) / 360) * 360 - 90;
      return threshold;
    });
  });
  const planetDegrees = PLANET_OFFSETS.map((d, i) => useTransform(() => {
    const angle = planetsOrbit.get() + d;
    const hiddenTime = hiddenSince.get();
    if (orbitalHide.get()) {
      const degrees = Math.max(
        angle - easeIn(hiddenTime / HIDING_TIME) * 360,
        planetHideAngleThreshold[i].get()
      );
      return degrees;
    } else {
      return angle;
    }
  }));
  const planetOpacities = PLANET_OFFSETS.map((d, i) => {
    return useSpring(useTransform(() => {
      const degrees = planetDegrees[i].get();
      const threshold = planetHideAngleThreshold[i].get();
      const opacity = Number(!orbitalHide.get() || degrees > threshold);
      return opacity;
    }), { bounce: 0, duration: 1000 });
  });

  const { eotsScale } = useTransform(scrollY, [0, EOTS_HEIGHT], {
    eotsScale: [1, 0.4],
  }, { ease: easeIn });
  const { planetsOpacity, planetsScale } = useTransform(useSpring(scrollY), [0, 600], {
    planetsOpacity: [0, 1],
    planetsScale: ["0%", "100%"],
  });


  // top of aboutMe relative to top of main container
  const aboutMeScrollY = useTransform(
    scrollY,
    (latest) => {
      if (!containerRef.current || !aboutMeRef.current) return 0;
      const containerTop = containerRef.current?.getBoundingClientRect().top;
      const aboutMeTop = aboutMeRef.current?.getBoundingClientRect().top;
      return containerTop - aboutMeTop;
    }
  );

  const goToEitherEnd = () => {
    const elem = containerRef.current!;
    if (elem.scrollTop >= EOTS_HEIGHT / 4) {
      elem.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      elem.scrollTo({ top: EOTS_HEIGHT, behavior: "smooth" });
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
    const timeout = setTimeout(confusedHelper, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useMotionValueEvent(aboutMeScrollY, "change", (latest) => {
    const previous = aboutMeScrollY.getPrevious();
    // console.log(previous, latest);
    if (previous === undefined) return;
    if (latest >= 0 && previous < 0) {
      window.history.pushState(null, "", "/about-me");
    } else if (latest < 0 && previous >= 0) {
      window.history.pushState(null, "", "/");
    }
  });

  const needsPrompting = isConfused && !hasScrolled;

  // The h-[calc(100vh-3rem)] comes from 2rem from between the viewport and the black box
  // Plus another 2*0.5rem from the p-2 inside the blackbox
  // Both can be found in app/layout.tsx

  const aboutMePlanets = [0, 1].map(() => (
    <Planet
      tooltip="About Me"
      tooltipClassName="bg-pink-900/50"
      className="bg-red-900/50 inset-shadow-red-800 hover:shadow-orange-500/50"
    >
      <Link
        href="/about-me"
        scroll={false}
        className="w-full h-full flex items-center justify-center"
        onClick={onClickAbout}
      >
        <Image src="/person-circle.svg" alt="About Me" width={60} height={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
      </Link>
    </Planet>
  ));

  return (
    <>
      <div ref={containerRef} className="w-full h-full overflow-y-auto flex flex-col items-center">
        <div className="w-full min-h-[calc(100vh+900px)]">

          <div className="sticky top-0 h-[calc(100vh-3rem)] overflow-hidden p-8 w-full flex flex-col items-center">
            <div className="h-full flex flex-row items-center">
              <div className="relative">
                <motion.div style={{ scale: eotsScale }} className="relative z-50">
                  <EyeOfTheStorm onClick={goToEitherEnd} />
                </motion.div>

                <div className="absolute left-1/2 top-1/2 transform -translate-1/2 scale-[500%] z-60 pointer-events-none">
                  <PromptClick visible={needsPrompting} />
                </div>
                <PromptText visible={needsPrompting} />

                <motion.div style={{ opacity: planetsOpacity }} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transform">
                  <motion.div style={{ width: planetsScale, height: planetsScale }} className="relative">
                    <InACircle
                      degrees={planetDegrees[0]}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      style={{
                        opacity: planetOpacities[0],
                      }}
                    >
                      {aboutMePlanets[0]}
                    </InACircle>
                    <InACircle
                      degrees={planetDegrees[1]}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      style={{
                        opacity: planetOpacities[1]
                      }}
                    >
                      <Planet
                        tooltip="Resume"
                        tooltipClassName="bg-orange-900/50"
                        className="bg-yellow-950 inset-shadow-yellow-800 hover:shadow-amber-500/50"
                      >
                        <Link href="/resume.pdf" className="w-full h-full flex items-center justify-center">
                          <HiDocumentText size={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle
                      degrees={planetDegrees[2]}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onClick={onMouseLeave}
                      style={{
                        opacity: planetOpacities[2]
                      }}
                    >
                      <MailPlanet />
                    </InACircle>
                    <InACircle
                      degrees={planetDegrees[3]}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      style={{
                        opacity: planetOpacities[3]
                      }}
                    >
                      <Planet
                        tooltip="Linkedin"
                        tooltipClassName="bg-sky-900/50"
                        className="bg-blue-950 inset-shadow-blue-800 hover:shadow-cyan-500/50"
                      >
                        <Link href="https://www.linkedin.com/in/renoir-tan" className="w-full h-full flex items-center justify-center">
                          <BsLinkedin size={48} className="hover:brightness-[.8] duration-200 w-[32px] md:w-[48px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle
                      degrees={planetDegrees[4]}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      style={{
                        opacity: planetOpacities[4]
                      }}
                    >
                      <Planet
                        tooltip="GitHub"
                        tooltipClassName="bg-violet-900/50"
                        className="bg-purple-950 inset-shadow-fuchsia-800 hover:shadow-fuchsia-500/50"
                      >
                        <Link href="https://github.com/RenoirTan" className="w-full h-full flex items-center justify-center">
                          <Image src="/github-mark-white.svg" alt="GitHub" width={60} height={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
                        </Link>
                      </Planet>
                    </InACircle>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-3 md:w-[720px] md:p-5 flex flex-col items-center -translate-y-[240px] h-[calc(100%-240px)]">
          <motion.div
            className="w-full flex flex-row justify-start mb-5"
            style={{
              opacity: useSpring(useTransform(() => {
                const hidden = orbitalHide.get();
                const time = hiddenSince.get();
                return Number(hidden && time >= HIDING_TIME);
              }), { bounce: 0, duration: 1000 }),
            }}
          >
            {aboutMePlanets[1]}
          </motion.div>
          {children}
        </div>
      </div>
    </>
  )
}
