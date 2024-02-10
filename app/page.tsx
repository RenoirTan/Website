import HelloName from "./ui/hello-name";
import Circus from "./ui/circus";
import IconTooltip from "./ui/icon-tooltip";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="flex place-content-center h-screen">
        <div className="mx-auto flex flex-col items-center justify-center">
          <Circus />
          <h1
            className="text-center text-4xl mx-6 font-semibold mt-12"
          >
            Hello, I am <HelloName />
          </h1>
          <div className="mt-4">
            <IconTooltip />
          </div>
        </div>
      </div>
    </main>
  );
}
