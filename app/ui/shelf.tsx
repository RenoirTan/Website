"use client";

import Cell from "./cell";

export default function Shelf() {
  return (
    <div className="border-2 rounded-2xl border-gray-300 px-5 py-5 bg-gradient-to-br from-purple-700 to-orange-900">
      <div className="grid grid-cols-3 gap-4">
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
        <Cell src="/github-mark-white.svg" alt="My GitHub" href="https://github.com/RenoirTan" />
      </div>
    </div>
  );
}