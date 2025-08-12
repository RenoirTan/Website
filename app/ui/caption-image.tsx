"use client";

import { Card } from "@chakra-ui/react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

export default function CaptionImage(props: ImageProps & {
  captions?: React.ReactNode;
}) {
  const [hovering, setHovering] = useState(false);

  const sub = props.captions ?? props.alt;
  const {className, alt, ...imageProps} = props;

  const image = <Image
    alt={alt ?? JSON.stringify(sub)}
    className={clsx(
      "w-full h-auto rounded-lg",
      !hovering && "ring-1 ring-l-dark-silver/30",
      hovering && "ring-4 ring-l-dark-silver/30",
    )}
    sizes="100vw"
    width={0}
    height={0}
    {...imageProps}
  />;

  const subType = typeof sub;
  const subElem = (subType === "string" || subType === "boolean" || subType === "number")
    ? <p className="text-center text-l-silver">{sub}</p>
    : sub;

  const card = <Card.Root
    variant="elevated"
    className={clsx(
      "rounded-2xl w-full bg-gradient-to-br from-purple-800 to-orange-950",
      props.className,
    )}
    onMouseOver={e => setHovering(true)}
    onMouseOut={e => setHovering(false)}
    flexDir="column"
  >
    <Card.Header className="p-2">
      {image}
    </Card.Header>

    <Card.Body className="py-2 mb-2 w-full">
      {subElem}
    </Card.Body>
  </Card.Root>;

  return card;
}