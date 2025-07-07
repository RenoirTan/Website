import { getCollectionPagesPath } from "@/lib/utils";
import path from "path";

export interface EventMetadata {
  title?: string;
  edition?: string;
  role?: string;
  image?: string;
};

const eventsDir = path.join(process.cwd(), "app", "(pages)", "_content", "events");

export async function getEventMetadata(path: string): Promise<EventMetadata> {
  const { frontmatter } = await import(`${path}`);
  const metadata: EventMetadata = {...frontmatter};
  return metadata;
}

export function getEventsPath(): string[] {
  return getCollectionPagesPath(eventsDir);
}