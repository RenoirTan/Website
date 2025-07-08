import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PageProvider } from "./providers";
import { Provider as ChakraProvider } from "@/chakra/ui/provider";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

const title = "Renoir's Website";
const description = "I'm a programmer who has had at least 6 years of programming by this point. My main languages are Python, Rust, C and recently JavaScript and TypeScript. Check out my GitHub to find out what I've been up to.";
const metadataBase = new URL("https://website-ten-jet-98.vercel.app/");

export const metadata: Metadata = {
  title,
  description,
  metadataBase,
  openGraph: {
    title,
    description
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={jetBrainsMono.className}>
        <ChakraProvider>
          <PageProvider>
            <main className="relative h-screen w-screen">
              <div
                className="absolute h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] md:h-[calc(100vh-2rem)] md:w-[calc(100vw-2rem)] left-[50%] top-[50%] rounded-3xl sarx"
                style={{ transform: "translate(-50%,-50%)" }}
              >
                <div className="relative w-full h-full p-5">
                  {children}
                </div>
              </div>
            </main>
          </PageProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
