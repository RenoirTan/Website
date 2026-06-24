"use client";

import { PageProvider } from "./providers";
import EyeOfTheStorm from "./ui/eye-of-the-storm";
import "./globals.css";
import { easeIn, motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { InACircle } from "./ui/in-a-circle";
import LinkCell from "./ui/link-cell";
import ButtonCell from "./ui/button-cell";
import { BsLinkedin } from "react-icons/bs";
import { Link } from "@chakra-ui/react";
import { HiDocumentText } from "react-icons/hi2";
import MailCell from "./ui/mail-cell";
import Planet from "./ui/planet";
import Image from "next/image";

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
                    <InACircle degrees={0}>
                      <Planet>
                        <Link href="about-me" className="w-full h-full flex items-center justify-center">
                          <Image src="/person-circle.svg" alt="About Me" width={40} height={40} />
                        </Link>
                      </Planet>
                    </InACircle>
                    <InACircle degrees={72}>
                      <LinkCell
                        src="/github-mark-white.svg"
                        alt="GitHub"
                        href="https://github.com/RenoirTan"
                      />
                    </InACircle>
                    <InACircle degrees={144}>
                      <Link href="https://www.linkedin.com/in/renoir-tan">
                        <ButtonCell caption="Linkedin" childYDisplacement="md:mt-[0.9rem]">
                          <BsLinkedin size={40} className="hover:brightness-[.8] duration-200" />
                        </ButtonCell>
                      </Link>
                    </InACircle>
                    <InACircle degrees={216}>
                      <Link href="/resume.pdf">
                        <ButtonCell caption="Resume" childYDisplacement="md:mt-[0.8rem]">
                          <HiDocumentText size={40} className="hover:brightness-[.8] duration-200" />
                        </ButtonCell>
                      </Link>
                    </InACircle>
                    <InACircle degrees={288}>
                      <MailCell />
                    </InACircle>
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
