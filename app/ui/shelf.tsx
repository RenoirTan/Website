"use client";

import { BsArrowLeft, BsLinkedin } from "react-icons/bs";
import { usePageContext } from "../providers";
import Cell from "./cell";
import LinkCell from "./link-cell";
import ButtonCell from "./button-cell";
import WipCell from "./wip-cell";
import Link from "next/link";
import EyeOfTheStorm from "./eye-of-the-storm";

export default function Shelf() {
  const { eotsPressed, setEotsPressed } = usePageContext();

  return (
    <div
      className="border-2 rounded-2xl border-gray-300 px-3 py-3 bg-gradient-to-br from-purple-700 to-orange-900 z-0"
    >
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-semibold">Select an item</p>
        <div className="grid grid-cols-3 gap-3">
          <Cell>
            {eotsPressed && <EyeOfTheStorm className="z-10" size={50} />}
            {!eotsPressed && <EyeOfTheStorm
              className="z-0 opacity-0 pointer-events-none"
              size={50}
              layoutId="fake"
            />}
          </Cell>
          <LinkCell
            src="/person-circle.svg"
            alt="About Me"
            href="/about-me"
          />
          <LinkCell
            src="/github-mark-white.svg"
            alt="GitHub"
            href="https://github.com/RenoirTan"
          />
          <Link href="https://www.linkedin.com/in/renoir-tan">
            <ButtonCell caption="Linkedin" childYDisplacement="md:mt-[0.9rem]">
              <BsLinkedin size={40} className="hover:brightness-[.8] duration-200" />
            </ButtonCell>
          </Link>
          <WipCell />
          <WipCell />
        </div>
      </div>
    </div>
  );
}