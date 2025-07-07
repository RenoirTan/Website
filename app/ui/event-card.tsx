import { EventMetadata, getEventMetadata } from "../(pages)/_content/events";
import MilestoneCard, { MilestoneCardProps } from "./milestone-card";

export default function EventCard({
  image,
  title,
  edition,
  role,
  ...props
}: MilestoneCardProps & EventMetadata) {
  const description = `Edition: ${edition} | Role: ${role}`;

  return <MilestoneCard
    image={image}
    title={title}
    description={description}
    milestoneType="liver"
    {...props}
  />;
}

export async function makeEventCard(path: string) {
  const eventMetadata = await getEventMetadata(`./${path}/page.mdx`);
  const key = path;
  const href = `/events/${path}`;

  return <EventCard key={key} href={href} {...eventMetadata} />;
}