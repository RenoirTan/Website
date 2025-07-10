"use client";

import { BsArrowLeft, BsLinkedin } from "react-icons/bs";
import { usePageContext } from "../providers";
import Cell from "./cell";
import LinkCell from "./link-cell";
import ButtonCell from "./button-cell";
import WipCell from "./wip-cell";
import Link from "next/link";

export default function Shelf() {
  const { setEotsPressed } = usePageContext();

  return (
    <div className="border-2 rounded-2xl border-gray-300 px-3 py-3 bg-gradient-to-br from-purple-700 to-orange-900">
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-semibold">Select an item</p>
        <div className="grid grid-cols-3 gap-3">
          <ButtonCell
            caption="Go Back"
            childYDisplacement="md:mt-[1rem]"
            onClick={() => { setEotsPressed(false) }}
          >
            <span className="text-center text-4xl"><BsArrowLeft /></span>
          </ButtonCell>
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