import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function Cell({
  src,
  alt,
  href
}: {
  src: string;
  alt: string;
  href: string;
}) {
  return (
    <div className={clsx(
      "duration-300 md:duration-500 border rounded-2xl bg-gray-900 p-2 text-center h-fit w-fit flex flex-col items-center gap-y-2"
    )}>
      <Link href={href}>
        <Image className="hover:brightness-[.8] duration-200" src={src} alt={alt} width={100} height={100} />
      </Link>
      <p>{alt}</p>
    </div>
  );
}