import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

export function Level() {
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);

  const { level } = gameState;
  const { showLevel } = displayState;

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
    background: "inset-0 fixed flex justify-center items-center z-10",
    levelContainer: "z-10 text-4xl",
  };

  if (!level) {
    return null;
  }

  return (
    <AnimatePresence mode={"wait"}>
      {showLevel && (
        <motion.div animate={animate.opacity} className={styles.background}>
          <motion.div
            key={level}
            className={styles.levelContainer}
            animate={animate}
            transition={transition}
          >
            Level {level}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
