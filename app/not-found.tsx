"use client";

import { BsArrowLeft, BsHouseFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import AbsoluteCenter from "./ui/absolute-center";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return <AbsoluteCenter>
    <div className="flex flex-col items-center gap-5">
      <MdCancel
        size={150}
        className="-mb-4"
        color="red"
      />
      <p>Page not found :(</p>
      <ButtonGroup attached>
        <Button
          className="bg-gradient-to-br from-lime-800 to-teal-950 text-white p-3"
          onClick={() => router.back()}
        >
          Back<BsArrowLeft />
        </Button>
        <Button className="bg-gradient-to-br from-purple-800 to-orange-950 text-white p-3">
          <Link href="/" className="flex flex-row items-center gap-2">
            <BsHouseFill />Home
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  </AbsoluteCenter>;
}