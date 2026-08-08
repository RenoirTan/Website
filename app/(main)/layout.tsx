import React from "react";


export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="animate-shimmer shimmer">
    <main className="relative h-screen w-screen">
      <div
        className="absolute h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] left-[50%] top-[50%] rounded-3xl sarx"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <div className="relative w-full h-full p-2">
          {children}
        </div>
      </div>
    </main>
  </div>;
}
