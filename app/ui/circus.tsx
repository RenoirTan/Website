"use client";

import React from "react";
import EyeOfTheStorm from "./eye-of-the-storm";
import Planet from "./planet";
import { usePageContext } from "../providers";

export default function Circus() {
  const { eotsPressed } = usePageContext();

  return (
    <div className="relative circus w-4/5 h-auto">
      <div className="inset-0 w-full h-full">
        <EyeOfTheStorm />
      </div>
      <div className="absolute top-0 inset-x-0 w-fit h-fit mx-auto">
        <Planet src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" show={eotsPressed} />
      </div>
    </div>
  )
}