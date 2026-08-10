import React from "react";
import { getAboutMePage } from "@/app/ui/home/get-content";
import { notFound } from "next/navigation";
import { ClientPage } from "@/app/ui/home/client-page";

export default async function HomeLayout(_props: {
  children: React.ReactNode;
}) {
  const aboutMe = await getAboutMePage();

  if (!aboutMe) {
    notFound();
  }

  return <ClientPage aboutMe={<aboutMe.default />} />;
}
