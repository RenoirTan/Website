import { getCollectionPagesPath, maybeParseDate } from "@/lib/utils";
import path from "path";

export type MilestoneType = "default" | "event" | "competition";

export interface RawMilestoneMetadata {
  milestoneType: MilestoneType;
  title?: string;
  summary?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
}

const milestonesDir = path.join(process.cwd(), "app", "(pages)", "_content", "milestones");

export function pathToMilestoneType(pathname: string): MilestoneType {
  const relativeToMe = path.relative(".", pathname);
  const pathSplat = relativeToMe.split("/");
  switch (true) {
    case /^\s.events?\s.$/.test(pathSplat[0]):
      return "event";
    case /^\s.competitions?\s.$/.test(pathSplat[0]):
      return "competition";
    default:
      return "default";
  }
}

export async function getRawMilestoneMetadata(pathname: string): Promise<RawMilestoneMetadata> {
  const milestoneType = pathToMilestoneType(pathname);
  const { frontmatter } = await import(`${pathname}`);
  const metadata: RawMilestoneMetadata = { milestoneType, ...frontmatter };
  return metadata;
}

export function getMilestonesPath(): string[] {
  return getCollectionPagesPath(milestonesDir);
}

export interface BaseMilestoneMetadata {
  title?: string;
  summary?: string;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  image?: string;
}

export interface MilestoneMetadata extends BaseMilestoneMetadata {
  milestoneType: "default" | "event" | "competition";
}

export function processRawMilestoneMetadata(raw: RawMilestoneMetadata): MilestoneMetadata {
  const date = maybeParseDate(raw.date);
  const startDate = maybeParseDate(raw.startDate);
  const endDate = maybeParseDate(raw.endDate);
  return {
    ...raw,
    date,
    startDate,
    endDate,
  };
}

export interface EventMetadata extends BaseMilestoneMetadata {
  milestoneType: "event";
}

export interface CompetitionMetadata extends BaseMilestoneMetadata {
  milestoneType: "competition";
  result?: string;
}