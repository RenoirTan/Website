import { getRawMilestoneMetadata } from "../(pages)/_content/milestones";
import MilestoneCard from "./milestone-card";

export async function makeMilestoneCard(path: string) {
  const rawMetadata = await getRawMilestoneMetadata(`./${path}/page.mdx`);
  const key = path;
  const href = `/competitions/${path}`;

  return <MilestoneCard key={key} href={href} {...rawMetadata} />;
}