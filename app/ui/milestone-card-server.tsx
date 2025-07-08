import { getRawMilestoneMetadata } from "../(pages)/_content/milestones";
import MilestoneCard from "./milestone-card";

export async function makeMilestoneCard(path: string) {
  let rawMetadata = await getRawMilestoneMetadata(`./${path}/page.mdx`);
  rawMetadata.title = `${rawMetadata.title} `;
  const key = path;
  const href = `/milestones/${path}`;
  const description = JSON.stringify(rawMetadata);

  return <MilestoneCard
    key={key}
    href={href}
    description={description}
    {...rawMetadata}
  />;
}