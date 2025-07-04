"use client";

import clsx from "clsx";
import { usePageContext } from "./providers";
import EyeOfTheStorm from "./ui/eye-of-the-storm";
import HelloText from "./ui/hello-text";
import AbsoluteCenter from "./ui/absolute-center";
import Shelf from "./ui/shelf";
import "./globals.css";

export default function Home() {
  const { eotsPressed } = usePageContext();

  return (
    <>
      <AbsoluteCenter className={clsx(!eotsPressed && "z-10", eotsPressed && "z-0")}>
        <div className={clsx(
          "flex flex-col items-center mx-auto my-auto duration-300 md:duration-500",
          !eotsPressed && "scale-100 opacity-100",
          eotsPressed && "scale-0 opacity-0"
        )}>
          <div className="w-3/5 flex flex-col items-center">
            <EyeOfTheStorm />
          </div>
          <div className="md:mx-6">
            <HelloText />
          </div>
        </div>
      </AbsoluteCenter>

      <AbsoluteCenter className={clsx(!eotsPressed && "z-0", eotsPressed && "z-10")}>
        <div className={clsx(
          "mx-auto my-auto duration-300 md:duration-500",
          eotsPressed && "scale-100 opacity-100",
          !eotsPressed && "scale-0 opacity-0"
        )}>
          <Shelf />
        </div>
      </AbsoluteCenter>
    </>
  );
}
