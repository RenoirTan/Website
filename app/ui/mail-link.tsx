'use client';

import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMail } from "react-icons/io5";

function generateEmailAddress() {
  return [
    'm', 'a', 'i', 'l', 't', 'o', ':',
    'o', 'f', 'f', 'i', 'c',
    'i', 'a', 'l', '@', 'r',
    'e', 'n', 'o', 'i', 'r',
    't', 'a', 'n', '.', 'c',
    'o', 'm'
  ].join("");
}

export default function MailLink() {
  const [mailto, setMailto] = useState("#");

  useEffect(() => {
    setMailto(generateEmailAddress());
  }, []);

  return <Link
    variant="underline"
    className="underline underline-offset-2"
    href={mailto}
  >
    <IoMail />
    official [at] renoirtan [dot] com
  </Link>;
}
