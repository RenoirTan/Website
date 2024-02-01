"use client";

import React, { useState } from "react";
import EyeOfTheStorm from "./eye-of-the-storm";
import Planet from "./planet";

export default function Circus() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="relative circus bg-l-red w-4/5">
      <div>
        <EyeOfTheStorm pressed={pressed} setPressed={setPressed} />
      </div>
      <div className="top-0 left-50">
        <Planet show={pressed} />
      </div>
    </div>
  )
}