import { motion } from "framer-motion";

export function Level({ level }) {
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

  const styles = {
    container: "absolute top-[40%] z-1 text-4xl",
  };

  return (
    <motion.div
      key={level}
      className={styles.container}
      animate={animate}
      transition={transition}
    >
      Level {level}
    </motion.div>
  );
}
