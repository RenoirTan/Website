import { DetailedHTMLProps, HTMLAttributes } from "react";

export function InACircle({
  degrees,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  degrees: number;
}) {
  // top is 0 degrees, right is 90 degrees, circle is a unit circle
  const radians = Math.PI / 180 * degrees;
  const top = 0.5 * (1 - Math.cos(radians));
  const left = 0.5 * (1 + Math.sin(radians))

  return (
    <div
      {...props}
      className="absolute"
      style={{
        top: `${100 * top}%`,
        left: `${100 * left}%`,
        transform: `translate(${-100 * left}%, ${-100 * top}%)`,
      }}
    >{props.children}</div>
  );
}
