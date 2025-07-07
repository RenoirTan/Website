import { CompetitionMetadata, getCompetitionMetadata } from "../(pages)/_content/competitions";
import MilestoneCard, { MilestoneCardProps } from "./milestone-card";

export default function CompetitionCard({
  image,
  title,
  edition,
  result,
  ...props
} : MilestoneCardProps & CompetitionMetadata) {
  const description = `Edition: ${edition} | Result: ${result}`;

  return <MilestoneCard
    image={image}
    title={title}
    description={description}
    milestoneType="liver"
    {...props}
  />;
}

export async function makeCompetitionCard(path: string) {
  const competitionMetadata = await getCompetitionMetadata(`./${path}/page.mdx`);
  const key = path;
  const href = `/competitions/${path}`;

  return <CompetitionCard key={key} href={href} {...competitionMetadata} />;
}