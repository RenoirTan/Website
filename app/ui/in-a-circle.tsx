import { MotionValue, motion, useMotionValue, useTransform } from "motion/react";

export function InACircle({
  degrees,
  children,
  className,
  style,
  ...props
}: Parameters<typeof motion.div>[0] & {
  degrees: number | MotionValue<number>;
}) {
  const deg = degrees instanceof MotionValue
    ? degrees
    : useMotionValue(degrees);
  // counter-rotate so the planet itself stays upright while it orbits
  const counter = useTransform(deg, (d) => -d);
  // the wrapper rotates a full-size layer instead of animating top/left,
  // so the orbit only touches the compositor, never layout
  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ rotate: deg }}>
      <motion.div
        {...props}
        className={`absolute left-1/2 top-0 pointer-events-auto ${className ?? ""}`}
        style={{
          x: "-50%",
          y: "-50%",
          rotate: counter,
          ...style,
        }}
      >{children}</motion.div>
    </motion.div>
  );
}
