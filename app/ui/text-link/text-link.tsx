"use client";

import { Link, LinkProps } from "@chakra-ui/react"
import clsx from "clsx";

export function TextLinkText({
  children
}: {
  children: string;
}) {
  return <p
    className={clsx(
      "bg-gradient-to-r bg-clip-text text-transparent no-underline",
      "from-l-blue-violet to-l-french-fuchsia rounded-md px-1",
      "hover:bg-clip-padding hover:text-l-white hover:to-l-red",
    )}
  >
    {children}
  </p>;
}

export function TextLinkRoot(props: LinkProps ) {
  return <Link {...props}>
    {props.children}
  </Link>;
}