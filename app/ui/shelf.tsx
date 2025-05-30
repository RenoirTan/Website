"use client";

import { BsArrowLeft } from "react-icons/bs";
import { usePageContext } from "../providers";
import Cell from "./cell";
import LinkCell from "./link-cell";

export default function Shelf() {
  const { setEotsPressed } = usePageContext();

  return (
    <div className="border-2 rounded-2xl border-gray-300 px-3 py-3 bg-gradient-to-br from-purple-700 to-orange-900">
      <div className="grid grid-cols-3 gap-2">
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell>
          <button
            className="w-full h-full"
            onClick={() => setEotsPressed(false)}
          >
            <div className="flex flex-col justify-center items-center">
              <BsArrowLeft className="text-5xl" />
              Go Back
            </div>
          </button>
        </Cell>
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <LinkCell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
      </div>
    </div>
  );
}