import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base md:text-lg font-bold">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base underline">{children}</h6>
    ),
    img: (props) => (
      <Image className="w-full h-auto" sizes="100vw" width={0} height={0} {...(props as ImageProps)} />
    ),
    ...components,
  };
}