import { getCollectionPagesPath } from "@/lib/utils";
import path from "path";

export interface RawMilestoneMetadata {
  title?: string;
  summary?: string;
  date?: string;
  image?: string;
};

const milestonesDir = path.join(process.cwd(), "app", "(pages)", "_content", "milestones");

export async function getRawMilestoneMetadata(path: string): Promise<RawMilestoneMetadata> {
  const { frontmatter } = await import(`${path}`);
  const metadata: RawMilestoneMetadata = {...frontmatter};
  return metadata;
}

export function getMilestonesPath(): string[] {
  return getCollectionPagesPath(milestonesDir);
}