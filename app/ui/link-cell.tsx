import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import Cell from "./cell";
import ButtonCell from "./button-cell";

export default function LinkCell({
  src,
  alt,
  href
}: {
  src: string;
  alt: string;
  href: string;
}) {
  return <ButtonCell caption={alt} childYDisplacement="1.1rem">
    <Link href={href}>
      <Image className="hover:brightness-[.8] duration-200" src={src} alt={alt} width={40} height={40} />
    </Link>
  </ButtonCell>;
}