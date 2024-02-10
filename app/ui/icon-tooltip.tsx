"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function IconTooltip() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Click on the icon :)"],
      typeSpeed: 50,
      startDelay: 5000,
      showCursor: false
    });

    return (() => {
      typed.destroy();
    });
  }, []);
  return (
    <p className="text-center text-sm font-normal opacity-85">
      ·
      <span ref={el} className="px-1"></span>
      ·
    </p>
  )
}