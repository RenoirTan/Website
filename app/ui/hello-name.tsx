"use client";

import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";

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
  const [visible, setVisible] = useState(false);
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (el.current) observer.observe(el.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const intervalId = setInterval(() => {
      setPulseState(state => (state + 1) % pulseCss.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [visible, pulseCss.length]);

  /*
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
  */

  return (
    <span
      ref={el}
      className={clsx(
        "font-bold duration-3000",
        visible ? "transition-colors" : "transition-none",
        pulseCss[pulseState]
      )}
    >Renoir</span>
  )
}
