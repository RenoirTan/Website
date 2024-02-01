"use client";

import React, { useState } from "react";
import EyeOfTheStorm from "./eye-of-the-storm";

export default function Circus({
  children
}: {
  children?: React.ReactNode;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div>
      <EyeOfTheStorm pressed={pressed} setPressed={setPressed} />
    </div>
  )
}