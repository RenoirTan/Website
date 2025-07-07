// https://vstollen.me/blog/advanced-mdx-layouts

import fs from "fs";
import path from "path";
import PagesLayout from "./pages-layout";
import { Metadata } from "next";

type PagesParams = {
  slug: string;
};

async function getPage(slug: string) {
  return await import(`../_content/${slug}/page.mdx`);
}

export default async function Page({
  params
}: {
  params: PagesParams;
}) {
  const content = await getPage(params.slug);
  return (
    <PagesLayout frontmatter={content.frontmatter}>
      <content.default />
    </PagesLayout>
  );
}

export async function generateMetadata({
  params
}: {
  params: PagesParams;
}): Promise<Metadata> {
  const { frontmatter } = await getPage(params.slug);

  return {
    title: frontmatter.title ?? "Renoir's Website"
  };
}

const pagesDir = path.join(process.cwd(), "app", "(pages)", "_content")

export function getStaticParams() {
  const allFiles = fs.readdirSync(pagesDir, { withFileTypes: true });
  const directories = allFiles.filter((file) => file.isDirectory());
  const slugs = directories.map(({ name }) => name);
  return slugs;
}