import { motion } from "framer-motion";
import "./Level.css";

export function Level({ level, shownlevel }) {
  const animate = {
    opacity: [0, 1, 0],
    fontSize: [
      "calc(10px + 3vmin)",
      "calc(10px + 6vmin)",
      "calc(10px + 6vmin)",
    ],
  };
  const transition = {
    duration: 2.0,
  };

  return (
    <motion.div
      key={level}
      className="level"
      animate={animate}
      transition={transition}
    >
      Level {shownlevel}
    </motion.div>
  );
}
