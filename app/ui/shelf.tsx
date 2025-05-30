"use client";

import { BsArrowLeft } from "react-icons/bs";
import { usePageContext } from "../providers";
import Cell from "./cell";
import LinkCell from "./link-cell";
import ButtonCell from "./button-cell";

export default function Shelf() {
  const { setEotsPressed } = usePageContext();

  return (
    <div className="border-2 rounded-2xl border-gray-300 px-3 py-3 bg-gradient-to-br from-purple-700 to-orange-900">
      <div className="grid grid-cols-3 gap-3">
        <LinkCell
          src="/github-mark-white.svg"
          alt="My GitHub"
          href="https://github.com/RenoirTan"
        />
        <LinkCell
          src="/person-circle.svg"
          alt="About Me"
          href="/about-me"
          childYDisplacement="md:mt-[0.9rem]"
        />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <ButtonCell
          caption="Go Back"
          childYDisplacement="md:mt-[0.8rem]"
          onClick={() => {setEotsPressed(false)}}
        >
          <span className="text-center text-4xl"><BsArrowLeft /></span>
        </ButtonCell>
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
      </div>
    </div>
  );
}