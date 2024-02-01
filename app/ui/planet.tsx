import { clsx } from "clsx";

export default function Planet({ show }: { show?: boolean }) {
  return (
    <div className={clsx(
      "duration-300 md:duration-500 text-center",
      show ? "opacity-100" : "opacity-0"
    )}>
      HELLO
    </div>
  );
}