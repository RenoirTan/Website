import Image from "next/image";
import EyeOfTheStorm from "./ui/eye-of-the-storm";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="flex place-content-center h-screen">
        <div className="mx-auto flex flex-col items-center justify-center">
          <EyeOfTheStorm />
        </div>
      </div>
    </main>
  );
}
