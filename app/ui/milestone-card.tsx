"use client";

import { Card, Image } from "@chakra-ui/react";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";

type MilestoneType = "default" | "liver" | "ocean" | "gold" | "violet" | "nature";

const MILESTONE_TYPE_CLASSNAME = {
  "default": "bg-gradient-to-br from-l-calm-gray to-l-black",
  "liver": "bg-gradient-to-br from-purple-900 to-orange-950",
  "ocean": "bg-gradient-to-br from-cyan-900 to-emerald-950",
  "gold": "bg-gradient-to-br from-pink-900 to-yellow-950",
  "violet": "bg-gradient-to-br from-cyan-950 to-purple-950",
  "nature": "bg-gradient-to-br from-lime-900 to-teal-950",
}

export default function MilestoneCard({
  image,
  title,
  description,
  href,
  className,
  milestoneType,
  ...props
}: {
  image?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  className?: string;
  milestoneType?: MilestoneType
}) {
  const [hovering, setHovering] = useState(false);

  const myImage = (image && typeof image === "string")
    ? <Image
        src={image}
      />
    : image;

  const card = (
    <Card.Root
      className={clsx(
        "m-2 w-[400px] max-w-fit rounded-2xl",
        MILESTONE_TYPE_CLASSNAME[milestoneType ?? "default"] ?? MILESTONE_TYPE_CLASSNAME.default,
        className,
      )}
      variant="elevated"
      {...props}
      onMouseOver={e => setHovering(true)}
      onMouseOut={e => setHovering(false)}
    >
      {myImage && <Card.Header className={clsx(
        "bg-black m-3 rounded-2xl ring transition-shadow duration-200",
        !hovering && "ring-1 ring-l-dark-silver/30",
        hovering && "ring-4 ring-l-dark-silver/30",
      )}>
        {myImage}
      </Card.Header>}
      <Card.Body gap="2">
        <Card.Title className="text-l-white font-extrabold text-xl">{title ?? "No title"}</Card.Title>
        <Card.Description className="text-l-silver text-md">{description ?? "No description"}</Card.Description>
      </Card.Body>
      <Card.Footer className="flex flex-col align-middle">
        {href && <p className="text-xs text-l-silver/30">Click me to find out more</p>}
      </Card.Footer>
    </Card.Root>
  );

  return href ? <Link href={href}>{card}</Link> : card;
}