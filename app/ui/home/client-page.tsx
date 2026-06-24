"use client";

import React, { useRef } from "react";
import System from "./system";
import { Layout } from "./content";

export function ClientPage({
  aboutMe,
}: {
  aboutMe: React.ReactNode
}) {
  const aboutMeRef = useRef<HTMLDivElement | null>(null);
  return <System aboutMeRef={aboutMeRef}>
    <div className="w-full flex flex-col items-center">
      <Layout ref={aboutMeRef}>
        {aboutMe}
      </Layout>
    </div>
  </System>;
}
