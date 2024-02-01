"use client";

import React, { useState } from "react";
import EyeOfTheStorm from "./eye-of-the-storm";
import Planet from "./planet";

export default function Circus() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="relative circus bg-l-red w-4/5 h-auto">
      <div className="inset-0 w-full h-full">
        <EyeOfTheStorm pressed={pressed} setPressed={setPressed} />
      </div>
      <div className="absolute top-0 inset-x-0">
        <Planet show={pressed} />
      </div>
    </div>
  )
}