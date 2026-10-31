import React from "react";
import DotGrid from "../ui/dot-grid";
import Shimmer from "../ui/shimmer";


export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative h-screen w-screen">
    <Shimmer className="absolute w-full h-full">
    </Shimmer>
    <div
      className="absolute h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] left-[50%] top-[50%] rounded-3xl sarx"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <div className="relative w-full h-full p-2">
        <DotGrid className="w-[calc(100%-2rem)] h-[calc(100%-2rem)]" dotSeparation="36px" dotColor="rgba(127, 127, 127, 0.5)" dotRadius="1.5px" />
        <main className="relative w-full h-full">
          {children}
        </main>
      </div>
    </div>
  </div>;
}
