import { motion } from "framer-motion";

export function Overlay({ showOverlay }) {
  const start = {
    opacity: 0,
    pointerEvents: "none",
  };
  const end = {
    opacity: 1,
    pointerEvents: "all",
  };
  const animationDuration = 0.7;
  return showOverlay ? (
    <motion.div
      id="overlay"
      initial={start}
      animate={end}
      transition={{ duration: animationDuration }}
    />
  ) : (
    <motion.div
      id="overlay"
      initial={end}
      animate={start}
      transition={{ duration: animationDuration }}
    />
  );
}
