import { clsx } from "clsx";
import Image from "next/image";

export default function Planet({ show }: { show?: boolean }) {
  return (
    <div className={clsx(
      "duration-300 md:duration-500 text-center flex justify-center",
      show ? "opacity-100" : "opacity-0"
    )}>
      <Image src="/github-mark-white.svg" alt="RenoirTan GitHub" width={100} height={100} />
    </div>
  );
}