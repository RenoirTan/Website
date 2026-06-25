'use client';

import { IoMail } from "react-icons/io5";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import clsx from "clsx";
import MailLink from "./mail-link";
import Planet from "./planet";

export default function MailPlanet() {
  return <Dialog.Root
    lazyMount
    motionPreset="slide-in-bottom"
    placement="center"
  >
    <Planet tooltip="Contact">
      <Dialog.Trigger asChild>
        <div className="w-full h-full flex items-center justify-center">
          <IoMail size={60} className="hover:brightness-[.8] duration-200 w-[40px] md:w-[60px]" />
        </div>
      </Dialog.Trigger>
    </Planet>
    <Portal>
      <InnerMailDialog />
    </Portal>
  </Dialog.Root>;
}

export function InnerMailDialog() {
  return <>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content
        className={clsx(
          "border-2 rounded-2xl border-gray-300",
          "bg-linear-to-br from-lime-800 to-teal-950"
        )}
      >
        <Dialog.Header>
          <Dialog.Title className="text-2xl, font-bold">
            Contact
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <MailLink />
        </Dialog.Body>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </>;
}
