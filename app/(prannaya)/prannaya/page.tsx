import path from "path";
import PrannayaClient from "./prannaya";
import { recursiveReaddirSync } from "@/lib/utils";

const prannayaStaticPath = path.join(process.cwd(), "public", "static", "prannaya");

export default function Prannaya() {
  const recursiveEntries = Array.from(
    recursiveReaddirSync(prannayaStaticPath, { withFileTypes: true, recursive: true })
      .filter((entry) => entry.isFile())
  );
  const paths = recursiveEntries
    .map((entry) => `url("${path.join("static", "prannaya", entry.name)}")`);
  return <PrannayaClient bubbleBackgroundImages={paths} />;
}
