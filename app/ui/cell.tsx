import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Cell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border rounded-2xl bg-gray-900 p-2 text-center flex flex-col justify-center items-center max-w-[100px] max-h-[100px] w-full h-full aspect-square">
      {children}
    </div>
  );
}