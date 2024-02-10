import HelloName from "./ui/hello-name";
import Circus from "./ui/circus";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="flex place-content-center h-screen">
        <div className="mx-auto flex flex-col items-center justify-center gap-y-8">
          <Circus />
          <h1
            className="text-center text-4xl mx-6 font-semibold"
          >
            Hello, I am <HelloName />
          </h1>
        </div>
      </div>
    </main>
  );
}
