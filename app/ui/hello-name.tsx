"use client";

import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

export default function HelloName() {
  const pulseCss = [
    "text-l-french-fuchsia border-l-french-fuchsia",
    "text-l-violet border-l-violet",
    "text-l-blue-violet border-l-blue-violet",
    "text-l-cyan border-l-cyan",
    "text-l-mint-green border-l-mint-green",
    "text-l-yellow border-l-yellow",
    "text-l-vermillion border-l-vermillion"
  ];
  const [pulseState, setPulseState] = useState(0);
  const el = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPulseState((pulseState + 1) % pulseCss.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [pulseState, pulseCss.length]);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Renoir"],
      typeSpeed: 100,
      startDelay: 500,
      showCursor: false
    });

    return (() => {
      typed.destroy();
    })
  }, []);

  return (
    <span
      ref={el}
      className={clsx(
        "font-bold transition-colors duration-[3000ms] border-r-[3px] pe-3",
        pulseCss[pulseState]
      )}
    />
  )
}