"use client";

import { BsCaretDown, BsCaretUp, BsLinkedin } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";
import Cell from "./cell";
import LinkCell from "./link-cell";
import ButtonCell from "./button-cell";
import WipCell from "./wip-cell";
import MailCell from "./mail-cell";
import Link from "next/link";
import EyeOfTheStorm from "./eye-of-the-storm";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import clsx from "clsx";
import { usePageContext } from "../providers";

export default function Shelf() {
  const { eotsPressed } = usePageContext();
  const [expandDescription, setExpandDescription] = useState(false);

  const gridRef = useRef<any>();

  return (
    <div
      className="border-2 rounded-2xl border-gray-300 px-3 py-3 bg-gradient-to-br from-purple-700 to-orange-900 z-0"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="max-w-full flex flex-col md:flex-row justify-between items-center gap-2 md:px-2"
          style={{
            width: gridRef.current ? gridRef.current.clientWidth : 0
          }}
        >
          {eotsPressed && <EyeOfTheStorm className="z-10 min-w-[70px] md:min-w-[100px]" size={100} />}
          {!eotsPressed && <EyeOfTheStorm
            layoutId="fake"
            className="-z-50 min-w-[70px] md:min-w-[100px]"
            size={100}
          />}
          <div className="w-full">
            <h1
              className="text-md md:text-xl font-bold text-center wrap-break-word"
            >
              {"Welcome!"}
            </h1>
            <div className="flex flex-col items-center">
              <p
                className={clsx(
                  "text-xs text-center wrap-break-word opacity-75"
                )}
              >
                {expandDescription ? <>
                  {"My name is Renoir. I have been coding since I was a teenager. In that time, I've been up to many different things."}
                  <br />
                  {"Click on any of the buttons below to explore what I've been doing."}
                </> : <>
                  My name is Renoir.
                </>}
              </p>
              <Button
                className="h-fit text-center text-xs"
                onClick={() => setExpandDescription(!expandDescription)}
              >
                {expandDescription ? <>Close <BsCaretUp /></> : <>See more <BsCaretDown /></>}
              </Button>
            </div>
          </div>
        </div>
        <div ref={gridRef} className="grid grid-cols-3 gap-3">
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
          <Link href="/resume.pdf">
            <ButtonCell caption="Resume" childYDisplacement="md:mt-[0.8rem]">
              <HiDocumentText size={40} className="hover:brightness-[.8] duration-200" />
            </ButtonCell>
          </Link>
          <MailCell />
          <WipCell />
        </div>
      </div>
    </div>
  );
}
