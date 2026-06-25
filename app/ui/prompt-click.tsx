import { clsx } from "clsx";
import { AnimatePresence, circOut, easeOut, motion } from "motion/react";
import { TbClick } from "react-icons/tb";

export default function PromptClick({
  visible,
  ...props
}: {
  visible?: boolean;
} & Parameters<typeof motion.div>[0]) {
  return <AnimatePresence>
    {visible && <InnerPromptClick {...props} />}
  </AnimatePresence>;
}

export function InnerPromptClick({
  className,
  ...props
}: Parameters<typeof motion.div>[0]) {
  return <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={{
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 0.5,
      },
    }}
    transition={{ duration: 0.5, ease: easeOut }}
    {...props}
    className={clsx("relative", className)}
  >
    <motion.div
      className="w-1/5 h-1/5 md:w-2/5 md:h-2/5 absolute left-1/2 top-1/2 transform -translate-1/2 rounded-full bg-yellow-200"
      animate={{
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.5, 1],
        transition: {
          opacity: {
            delay: 0.5,
            duration: 2.5,
            times: [0.82, 0.87, 0.92],
            repeat: Infinity,
          },
          scale: {
            delay: 0.5,
            duration: 2.5,
            times: [0.82, 0.87, 0.92],
            repeat: Infinity,
          },
        },
      }}
    ></motion.div>
    <motion.div
      animate={{
        opacity: [1, 0.25, 1],
        scale: [1, 0.6, 1],
        transition: {
          opacity: {
            ease: circOut,
            delay: 0.5,
            duration: 2.5,
            times: [0.5, 0.8, 1],
            repeat: Infinity
          },
          scale: {
            ease: circOut,
            delay: 0.5,
            duration: 2.5,
            times: [0.7, 0.8, 0.9],
            repeat: Infinity,
          },
        },
      }}
    >
      <TbClick />
    </motion.div>
  </motion.div >;
}
