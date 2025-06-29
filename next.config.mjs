import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

export default withMDX(nextConfig);
