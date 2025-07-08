// https://vstollen.me/blog/advanced-mdx-layouts

import fs from "fs";
import path from "path";
import PagesLayout from "./pages-layout";
import { Metadata } from "next";
import { direntPath, isDirWithPage, PAGE_FILENAMES, recursiveReaddirSync } from "@/lib/utils";

export interface PagesParams {
  slug: string[];
};

async function getPage(slug: string[]) {
  const pathComponent = path.join(...slug);
  return await import(`../_content/${pathComponent}/page.mdx`);
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

export function generateStaticParams() {
  const allDirs = [...recursiveReaddirSync(
    pagesDir,
    { withFileTypes: true, filter: (entry: fs.Dirent): boolean => entry.isDirectory()}
  )];
  const directories = allDirs.filter(
    (entry: any) => isDirWithPage(direntPath(entry))
  );
  const slugs = directories.map(
    (entry: any) => path.relative(pagesDir, direntPath(entry)).split("/")
  );
  const params: PagesParams[] = slugs.map(slug => { return { slug: slug }; });
  return params;
}