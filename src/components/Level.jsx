import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export function Level() {
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);

  const { level } = gameState;
  const { levelAnimationDuration } = displayState;

  const animate = {
    opacity: [0, 1, 1, 1, 0],
    fontSize: [
      "calc(10px + 3vmin)",
      "calc(10px + 6vmin)",
      "calc(10px + 6vmin)",
      "calc(10px + 6vmin)",
      "calc(10px + 6vmin)",
    ],
  };

  const transition = {
    duration: levelAnimationDuration / 1000,
  };

  if (!level) {
    return null;
  }

  return (
    <motion.div
      animate={animate.opacity}
      className="absolute w-full h-full flex justify-center items-center z-10"
    >
      <motion.div
        key={level}
        className="z-10 text-4xl"
        animate={animate}
        transition={transition}
      >
        Level {level}
      </motion.div>
    </motion.div>
  );
}
