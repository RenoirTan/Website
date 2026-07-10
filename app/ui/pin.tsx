"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { BiLogoFlask, BiLogoTypescript } from "react-icons/bi";
import { FaLinux, FaPython, FaRust } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiCplusplus, SiDjango, SiDocker, SiNestjs, SiScikitlearn, SiTensorflow } from "react-icons/si";
import { twMerge } from "tailwind-merge";
import { FontforgeIcon } from "./icons/fontforge";
import { CoolifyIcon } from "./icons/coolify";
import { OpencodeIcon } from "./icons/opencode";

export default function Pin({
  children,
  className,
  ...props
}: Parameters<typeof motion.div>[0]) {
  return <motion.div
    {...props}
    className={twMerge(
      "w-fit h-full flex flex-row gap-x-2 items-center rounded-full bg-slate-800 inset-shadow-xs inset-shadow-slate-500/50 py-1 px-2",
      className
    )}
  >
    {children}
  </motion.div>;
}

export function FontforgePin() {
  return <Link href="https://fontforge.org/en-US/">
    <Pin className="bg-linear-to-br from-sky-300 to-gray-400 from-30% inset-shadow-slate-300/50">
      <FontforgeIcon fill="#FFFFFF" className="aspect-square h-[16px]" />
      <span className="text-lg hidden md:inline">FontForge</span>
    </Pin>
  </Link>
}

export function PythonPin() {
  return <Link href="https://python.org">
    <Pin className="bg-linear-to-br from-blue-600 to-yellow-600 from-30% to-70%">
      <FaPython />
      <span className="text-lg hidden md:inline">Python</span>
    </Pin>
  </Link>;
}

export function JsTsPin() {
  return <Link href="https://typescriptlang.org">
    <Pin className="bg-linear-to-br from-yellow-500 to-amber-500 text-black">
      <BiLogoTypescript />
      <span className="text-lg hidden md:inline">TypeScript</span>
    </Pin>
  </Link>;
}

export function RustPin() {
  return <Link href="https://rust-lang.org">
    <Pin className="bg-linear-to-br from-red-700 to-fuchsia-800">
      <FaRust />
      <span className="text-lg hidden md:inline">Rust</span>
    </Pin>
  </Link>;
}

export function CppPin() {
  return <Pin className="bg-linear-to-br from-blue-600 to-indigo-700">
    <SiCplusplus />
    <span className="text-lg hidden md:inline">C/C++</span>
  </Pin>;
}

export function TensorflowPin() {
  return <Link href="https://www.tensorflow.org/">
    <Pin className="bg-linear-to-br from-amber-500 to-orange-600 text-black">
      <SiTensorflow />
      <span className="text-lg hidden md:inline">Tensorflow</span>
    </Pin>
  </Link>;
}

export function ScikitPin() {
  return <Link href="https://scikit-learn.org">
    <Pin className="bg-linear-to-br from-amber-600 to-sky-700 from-30% to-70%">
      <SiScikitlearn />
      <span className="text-lg hidden md:inline">Scikit-learn</span>
    </Pin>
  </Link>;
}

export function FlaskPin() {
  return <Link href="https://flask.palletsproject.org">
    <Pin className="bg-orange-500 text-black">
      <BiLogoFlask />
      <span className="text-lg hidden md:inline">Flask</span>
    </Pin>
  </Link>;
}

export function DjangoPin() {
  return <Link href="https://djangoproject.org">
    <Pin className="bg-emerald-400 text-black">
      <SiDjango />
      <span className="text-lg hidden md:inline">Django</span>
    </Pin>
  </Link>;
}

export function NextJsPin() {
  return <Link href="https://nextjs.org">
    <Pin className="bg-linear-to-br from-blue-600 to-violet-700 from-30% to-70%">
      <RiNextjsFill />
      <span className="text-lg hidden md:inline">NextJS</span>
    </Pin>
  </Link>;
}

export function NestJsPin() {
  return <Link href="https://nestjs.com">
    <Pin className="bg-pink-600">
      <SiNestjs />
      <span className="text-lg hidden md:inline">NestJS</span>
    </Pin>
  </Link>;
}

export function DockerPin() {
  return <Link href="https://docker.com">
    <Pin className="bg-sky-500">
      <SiDocker />
      <span className="text-lg hidden md:inline">Docker</span>
    </Pin>
  </Link>;
}

export function CoolifyPin() {
  return <Link href="https://coolify.io">
    <Pin className="bg-violet-600">
      <CoolifyIcon fill="#FFFFFF" className="aspect-square h-[16px]" />
      <span className="text-lg hidden md:inline">Coolify</span>
    </Pin>
  </Link>;
}

export function LinuxPin() {
  return <Pin className="bg-black text-yellow-500">
    <FaLinux />
    <span className="text-lg hidden md:inline">Linux</span>
  </Pin>;
}

export function OpencodePin() {
  return <Link href="https://opencode.ai">
    <Pin className="bg-black">
      <OpencodeIcon fill="#FFFFFF" className="aspect-square h-[16px]" />
      <span className="text-lg hidden md:inline">Opencode</span>
    </Pin>
  </Link>;
}
