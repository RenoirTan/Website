import { getRawMilestoneMetadata } from "../(pages)/_content/milestones";
import MilestoneCard from "./milestone-card";

export async function makeMilestoneCard(path: string) {
  const rawMetadata = await getRawMilestoneMetadata(`./${path}/page.mdx`);
  const key = path;
  const href = `/milestones/${path}`;
  const description = JSON.stringify(rawMetadata);

  return <MilestoneCard key={key} href={href} description={description} {...rawMetadata} />;
}