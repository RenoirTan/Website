import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter']
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter]
  }
});

export default withMDX(nextConfig);
