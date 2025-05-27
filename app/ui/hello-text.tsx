import HelloName from "./hello-name";
import IconTooltip from "./icon-tooltip";

export default function HelloText() {
  return <div className="mx-6">
    <h1
      className="text-center text-2xl md:text-4xl font-semibold mt-12"
    >
      Hello, I am <HelloName />
    </h1>
    <div className="mt-4">
      <IconTooltip />
    </div>
  </div>
}