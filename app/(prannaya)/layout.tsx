import { Comic_Relief } from "next/font/google";

const comicSans = Comic_Relief({ weight: "700", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={comicSans.className}>
      {children}
    </div>
  );
}
