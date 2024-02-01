"use client";

import Image from "next/image";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

export default function EyeOfTheStorm() {
  // https://www.kindacode.com/article/react-get-the-position-x-y-of-an-element/
  const imgRef = useRef<HTMLDivElement>(null);

  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [x, setX] = useState(0); // x coords of origin
  const [y, setY] = useState(0); // y coords of origin
  const [width, setWidth] = useState(1); // width of image, including padding
  const [height, setHeight] = useState(1); // height of image

  const getDimensions = () => {
    const topLeftX = imgRef.current?.offsetLeft || 0;
    const topLeftY = imgRef.current?.offsetTop || 0;
    const newWidth = imgRef.current?.offsetWidth || 1;
    const newHeight = imgRef.current?.offsetHeight || 1;
    const newX = topLeftX + (newWidth / 2);
    const newY = topLeftY + (newHeight / 2);
    setX(newX);
    setY(newY);
    setWidth(newWidth);
    setHeight(newHeight);
  }

  // on load
  useEffect(() => {
    getDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getDimensions);
  }, []);

  return (
    <div ref={imgRef} className="scale-75">
      <Image
        className={clsx(
          "duration-300 md:duration-500 rounded-full shadow-xl shadow-orange-800 bg-black",
          ((hovering && !clicked) &&
            "-rotate-12 md:-rotate-45 brightness-110 scale-110 shadow-rose-500"),
          clicked && "scale-[0.1] md:scale-[0.25]"
        )}
        src="/icon.png"
        alt="Eye of the Storm"
        height={600}
        width={600}
        quality={100}
        objectFit="contain"
        priority
        onMouseMove={function (e) {
          const mx = e.pageX - x;
          const my = e.pageY - y;
          const dx = mx / width;
          const dy = my / height;
          const sdfo = (dx * dx) + (dy * dy);
          if (sdfo <= 0.25) {
            setHovering(true);
          } else {
            setHovering(false);
          }
        }}
        onMouseOut={() => setHovering(false)}
        onClick={() => setClicked(!clicked)}
      />
    </div>
  );
}