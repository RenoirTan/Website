"use client";

import { AnimatePresence, easeOut, motion } from "motion/react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function PromptText({
  visible,
}: {
  visible?: boolean;
}) {
  return <AnimatePresence>
    {visible && <InnerPromptText />}
  </AnimatePresence>;
}

export function InnerPromptText({ }: {}) {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Click on the icon"],
      typeSpeed: 50,
      startDelay: 250,
      showCursor: false,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={{
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    }}
    transition={{ duration: 0.5, ease: easeOut }}
    className="z-60 py-2 px-3 fixed w-fit text-nowrap left-1/2 top-[75%] transform -translate-x-1/2 -translate-y-[75%] bg-slate-900/75 inset-shadow-xs inset-shadow-slate-500/50 rounded-lg"
  >
    <motion.span
      ref={el}
      className="text-md md:text-3xl"
      animate={{
        opacity: [1, 0.5, 1],
        transition: {
          opacity: {
            delay: 0.5,
            duration: 4,
            times: [0, 0.5, 1],
            repeat: Infinity,
          },
        }
      }}
    />
  </motion.div>;
}
