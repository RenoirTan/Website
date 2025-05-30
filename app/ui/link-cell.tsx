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
    <div className="max-w-full max-h-full w-fit h-fit aspect-square flex flex-col justify-center items-center gap-y-1">
      <Link href={href}>
        <Image className="hover:brightness-[.8] duration-200" src={src} alt={alt} width={40} height={40} />
      </Link>
      <p className="max-w-full text-sm text-wrap truncate">{alt}</p>
    </div>
  </Cell>;
}