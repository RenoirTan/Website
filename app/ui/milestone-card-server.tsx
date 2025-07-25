import { getRawMilestoneMetadata } from "../(pages)/_content/milestones";
import MilestoneCard from "./milestone-card";

export async function makeMilestoneCard(
  path: string,
  {
    className,
  }: {
    className?: string;
}) {
  let rawMetadata = await getRawMilestoneMetadata(`./${path}/page.mdx`);
  rawMetadata.title = `${rawMetadata.title} `;
  const key = path;
  const href = `/milestones/${path}`;
  const description = rawMetadata.summary ?? "No description given.";

  return <MilestoneCard
    key={key}
    href={href}
    description={description}
    {...rawMetadata}
    className={className}
  />;
}