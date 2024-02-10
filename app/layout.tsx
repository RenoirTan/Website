import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

const title = "Renoir's Website";
const description = "I'm a programmer who has had at least 6 years of programming by this point. My main languages are Python, Rust, C and recently JavaScript and TypeScript (on the front end). Check out my GitHub to find out what I've been up to.";
const metadataBase = undefined; // use default value

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
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  );
}
