import { PageProvider } from "./providers";
import "./globals.css";
import System from "./system";
import { AboutMe } from "./home-components";

export default async function Home() {
  const aboutMe = await AboutMe();

  return <PageProvider>
    <System>
      <div className="w-full flex flex-col items-center">
        {aboutMe}
      </div>
    </System>
  </PageProvider>;
}
