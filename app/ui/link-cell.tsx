import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import Cell from "./cell";

export default function LinkCell({
  src,
  alt,
  href
}: {
  src: string;
  alt: string;
  href: string;
}) {
  return <Cell>
    <div className="flex flex-col justify-center items-center gap-y-1">
      <Link href={href}>
        <Image className="hover:brightness-[.8] duration-200" src={src} alt={alt} width={60} height={60} />
      </Link>
      <p className="text-sm">{alt}</p>
    </div>
  </Cell>;
}