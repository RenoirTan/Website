import { CosineIcon } from "@/app/ui/icons/cosine";

export default function Prannaya() {
  return <div className="min-h-screen bg-linear-to-b to-[75vh] from-sky-300 to-blue-700">
    <h1>What</h1>
    <div className="flex flex-row">
      <CosineIcon className="bg-linear-to-r from-green-500 to-red-500" />
      <CosineIcon />
    </div>
  </div>;
}
