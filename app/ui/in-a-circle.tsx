import { MotionValue, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react";

export function InACircle({
  ...props
}: Parameters<typeof motion.div>[0] & {
  degrees: number | MotionValue<number>;
}) {
  const degrees = props.degrees instanceof MotionValue
    ? props.degrees
    : useMotionValue(props.degrees);
  // top is 0 degrees, right is 90 degrees, circle is a unit circle
  const radians = useTransform(degrees, [0, 360], [0, 2 * Math.PI], { clamp: false });
  const top = useTransform(() => 0.5 * (1 - Math.cos(radians.get())));
  const left = useTransform(() => 0.5 * (1 + Math.sin(radians.get())));

  const topStyle = useTransform(top, [0, 1], ["0%", "100%"]);
  const leftStyle = useTransform(left, [0, 1], ["0%", "100%"]);
  const translateTopStyle = useTransform(top, [0, 1], ["0%", "-100%"]);
  const translateLeftStyle = useTransform(left, [0, 1], ["0%", "-100%"]);
  const translateStyle = useMotionTemplate`translate(${translateLeftStyle}, ${translateTopStyle})`;
  return (
    <motion.div
      {...props}
      className="absolute"
      style={{
        top: topStyle,
        left: leftStyle,
        transform: translateStyle,
        ...props.style,
      }}
    >{props.children}</motion.div>
  );
}
