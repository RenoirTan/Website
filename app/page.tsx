import Image from "next/image";
import EyeOfTheStorm from "./ui/eye-of-the-storm";
import Circus from "./ui/circus";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="flex place-content-center h-screen">
        <div className="mx-auto flex flex-col items-center justify-center">
          <Circus></Circus>
          <h1
            className="text-center text-4xl md:-mt-6 mx-6 font-semibold"
          >
            Hello, I am <span className="bg-clip-text text-transparent bg-gradient-to-tr from-l-french-fuchsia to-l-violet font-bold">Renoir</span>
          </h1>
        </div>
      </div>
    </main>
  );
}
