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
    <Layout ref={aboutMeRef} id="about-me">
      {aboutMe}
    </Layout>
  </System>;
}
