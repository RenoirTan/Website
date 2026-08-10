import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Provider as ChakraProvider } from "@/chakra/ui/provider";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

const title = "Renoir's Website";
const description = "I'm a programmer who has had at least 6 years of programming by this point. My main languages are Python, Rust, C and recently JavaScript and TypeScript. Check out my GitHub to find out what I've been up to.";
const metadataBase = new URL("https://renoirtan.com/");

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
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
