export async function getAboutMePage() {
  try {
    const content = await import("./about-me.mdx");
    return content;
  } catch (error) {
    return undefined;
  }
}
