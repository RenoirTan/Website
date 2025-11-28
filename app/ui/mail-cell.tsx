'use client';

import ButtonCell, { type ButtonCellProps } from "./button-cell";
import { IoMail } from "react-icons/io5";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";
import clsx from "clsx";
import MailLink from "./mail-link";

export default function MailCell() {
  const [open, setOpen] = useState(false);

  return <Dialog.Root
    lazyMount
    open={open}
    onOpenChange={(e) => setOpen(e.open)}
    motionPreset="slide-in-bottom"
    placement="center"
  >
    <Dialog.Trigger asChild>
      <InnerMailCell onClick={_ => setOpen(!open)} />
    </Dialog.Trigger>
    <Portal>
      <InnerMailDialog />
    </Portal>
  </Dialog.Root>;
}

export function InnerMailCell({
  onClick,
  ...props
}: Omit<ButtonCellProps, 'children' | 'childYDisplacement' | 'caption'>) {
  return <ButtonCell
    caption="Contact"
    childYDisplacement="md:mt-[1rem]"
    onClick={onClick}
    {...props}
  >
    <span className="text-center text-4xl"><IoMail /></span>
  </ButtonCell>;
}

export function InnerMailDialog() {
  return <>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content
        className={clsx(
          "border-2 rounded-2xl border-gray-300",
          "bg-gradient-to-br from-lime-800 to-teal-950"
        )}
      >
        <Dialog.Header>
          <Dialog.Title>
            <h2 className="text-2xl font-bold">Contact</h2>
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
