"use client";

import { Card, Image } from "@chakra-ui/react";
import clsx from "clsx";
import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";

type MilestoneColorTheme = "default" | "liver" | "ocean" | "gold" | "violet" | "nature";

const MILESTONE_COLORTHEME_CLASSNAME = {
  "default": "bg-gradient-to-br from-l-calm-gray to-l-black",
  "liver": "bg-gradient-to-br from-purple-900 to-orange-950",
  "ocean": "bg-gradient-to-br from-cyan-900 to-emerald-950",
  "gold": "bg-gradient-to-br from-pink-900 to-yellow-950",
  "violet": "bg-gradient-to-br from-cyan-950 to-purple-950",
  "nature": "bg-gradient-to-br from-lime-900 to-teal-950",
}

export interface MilestoneCardProps {
  image?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  className?: string;
  colorTheme?: MilestoneColorTheme;
  alt?: string;
};

export default function MilestoneCard({
  image,
  title,
  description,
  href,
  className,
  colorTheme,
  alt,
  ...props
}: MilestoneCardProps) {
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const myImage = (image && typeof image === "string")
    ? <Image
        src={image}
        alt={alt}
        maxWidth={100}
      />
    : image;

  const card = (
    <Card.Root
      className={clsx(
        "rounded-2xl w-fit",
        MILESTONE_COLORTHEME_CLASSNAME[colorTheme ?? "default"]
          ?? MILESTONE_COLORTHEME_CLASSNAME.default,
        className,
      )}
      variant="elevated"
      {...props}
      onMouseOver={e => setHovering(true)}
      onMouseOut={e => setHovering(false)}
      flexDir={isMobile ? "column" : "row"}
    >
      {myImage && <Card.Header className={clsx(
        "bg-black mt-3 mx-3 -mb-3 md:mb-3 p-0 w-fit h-fit rounded-xl ring transition-shadow duration-200 overflow-clip",
        !hovering && "ring-1 ring-l-dark-silver/30",
        hovering && "ring-4 ring-l-dark-silver/30",
      )}>
        {myImage}
      </Card.Header>}
      <Card.Body gap="2">
        <Card.Title className="text-l-white font-extrabold text-lg md:text-xl text-wrap">
          {title ?? "No title"}
        </Card.Title>
        <Card.Description className="text-l-silver text-md text-wrap">
          {description ?? "No description"}
        </Card.Description>
        {href && <p className="text-xs text-l-silver/30">Click me to find out more</p>}
      </Card.Body>
    </Card.Root>
  );

  return href
    ? <Link href={href} className="w-full">{card}</Link>
    : card;
}