import { direntPath, isDirWithPage, recursiveReaddirSync } from "@/lib/utils";
import fs from "fs";
import path from "path";

export interface CompetitionMetadata {
  title?: string;
  edition?: string;
  result?: string;
  image?: string;
};

const competitionsDir = path.join(process.cwd(), "app", "(pages)", "_content", "competitions");

export async function getCompetitionMetadata(path: string): Promise<CompetitionMetadata> {
  const { frontmatter } = await import(`${path}`);
  const metadata: CompetitionMetadata = {
    title: frontmatter.title,
    edition: frontmatter.edition,
    result: frontmatter.result,
    image: frontmatter.image,
  };
  return metadata;
}

export function getCompetitionsPath(): string[] {
  const allDirs = [...recursiveReaddirSync(
    competitionsDir,
    { withFileTypes: true, filter: (entry: fs.Dirent): boolean => entry.isDirectory()}
  )];
  const directories = allDirs.filter(
    (entry: any) => isDirWithPage(direntPath(entry))
  );
  const paths = directories.map(
    (entry: any) => path.join(path.relative(competitionsDir, direntPath(entry)))
  );
  return paths;
}