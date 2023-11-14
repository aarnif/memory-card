import "./Card.css";
import { motion, AnimatePresence } from "framer-motion";
import DcComics from "../assets/other-images/dc_comics_logo.svg";

export function Card({ playCard, image, name, showCard, animationDuration }) {
  const duration = animationDuration / 1000;
  const initial = {
    rotateY: -90,
  };
  const animate = {
    rotateY: 0,
    transition: {
      duration: duration / 2,
      ease: "easeInOut",
    },
  };
  const exit = {
    rotateY: 90,
    transition: { duration: duration / 2, ease: "easeInOut" },
  };

  return (
    <AnimatePresence mode="wait">
      {showCard ? (
        <motion.div
          key={image}
          className="character-card"
          onClick={playCard}
          initial={initial}
          animate={animate}
          exit={exit}
        >
          <img className="character--image" src={image} alt="" />
          <div className="character--name">{name}</div>
        </motion.div>
      ) : (
        <motion.div
          key={DcComics}
          className="logo-card"
          initial={initial}
          animate={animate}
          exit={exit}
        >
          <img className="logo--image" src={DcComics} alt="" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
