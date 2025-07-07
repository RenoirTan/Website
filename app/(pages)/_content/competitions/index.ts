import { getCollectionPagesPath } from "@/lib/utils";
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
  const metadata: CompetitionMetadata = {...frontmatter};
  return metadata;
}

export function getCompetitionsPath(): string[] {
  return getCollectionPagesPath(competitionsDir);
}