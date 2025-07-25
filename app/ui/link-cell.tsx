import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import Cell from "./cell";
import ButtonCell from "./button-cell";

export default function LinkCell({
  src,
  alt,
  href,
  childYDisplacement
}: {
  src: string;
  alt: string;
  href: string;
  childYDisplacement?: string;
}) {
  return <Link href={href}>
    <ButtonCell caption={alt} childYDisplacement={childYDisplacement ?? "md:mt-[0.9rem]"}>
      <Image className="hover:brightness-[.8] duration-200" src={src} alt={alt} width={40} height={40} />
    </ButtonCell>
  </Link>;
}