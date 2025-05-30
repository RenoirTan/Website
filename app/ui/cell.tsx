import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Cell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border rounded-2xl bg-gray-900 p-2 text-center flex flex-col justify-center items-center w-[100px] h-[100px]">
      {children}
    </div>
  );
}