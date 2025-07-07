import { CompetitionMetadata } from "../(pages)/_content/competitions";
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
    {...props}
    milestoneType="liver"
  />;
}