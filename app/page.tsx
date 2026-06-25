import { PageProvider } from "./providers";
import "./globals.css";
import { getAboutMePage } from "./ui/home/get-content";
import { ClientPage } from "./ui/home/client-page";
import { notFound } from "next/navigation";

export default async function Home() {
  const aboutMe = await getAboutMePage();

  if (!aboutMe) {
    notFound();
  }

  return <PageProvider>
    <ClientPage aboutMe={<aboutMe.default />} />
  </PageProvider>;
}
