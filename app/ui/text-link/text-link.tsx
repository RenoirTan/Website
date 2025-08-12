"use client";

import { Link, LinkProps } from "@chakra-ui/react"

export function TextLinkText({
  children
}: {
  children: string;
}) {
  return <p className="bg-gradient-to-r bg-clip-text text-transparent from-l-blue-violet to-l-french-fuchsia">
    {children}
  </p>;
}

export function TextLinkRoot(props: LinkProps ) {
  return <Link {...props}>
    {props.children}
  </Link>;
}