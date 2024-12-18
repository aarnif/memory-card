import { useEffect } from "react";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useSound from "use-sound";

import levelNext from "../assets/sounds/arcade_ui_27.mp3";

export function Level() {
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);

  const { playSound } = displayState;

  const [nextLevelSound] = useSound(levelNext, {
    volume: playSound ? 0.25 : 0,
  });

  useEffect(() => {
    nextLevelSound();
  }, [nextLevelSound]);

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
