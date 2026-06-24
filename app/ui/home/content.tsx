import React from "react";

async function getAboutMePage() {
  try {
    const content = await import("../../(pages)/_content/about-me/page.mdx");
    return content;
  } catch (error) {
    return undefined;
  }
}

export function Layout({
  children
}: { children: React.ReactNode; }) {
  return <div className="flex flex-col gap-3 w-full p-3 md:w-[720px] md:p-5">{children}</div>
}

export async function AboutMe() {
  const page = await getAboutMePage();
  return <Layout><page.default /></Layout>;
}
