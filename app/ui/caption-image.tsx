"use client";

import { Card } from "@chakra-ui/react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";
import { CardColorTheme, getColorTheme } from "./card-color-theme";
import { motion } from "motion/react";

export default function CaptionImage(props: ImageProps & {
  captions?: React.ReactNode;
  colorTheme?: CardColorTheme;
}) {
  const [hovering, setHovering] = useState(false);

  const sub = props.captions ?? props.alt;
  const {className, alt, colorTheme, ...imageProps} = props;

  const image = <Image
    alt={alt ?? JSON.stringify(sub)}
    className={clsx(
      "w-full h-auto rounded-lg transition-shadow duration-200",
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
    ? <p className="text-md text-center text-l-silver">{sub}</p>
    : sub;

  const card = <Card.Root
    variant="elevated"
    className={clsx(
      "rounded-2xl w-full",
      getColorTheme(colorTheme),
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

  return <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.1 }}
    variants={{
      visible: { opacity: 1, scale: 1 },
      hidden: { opacity: 0, scale: 0.5 },
    }}
  >
    {card}
  </motion.div>;
}