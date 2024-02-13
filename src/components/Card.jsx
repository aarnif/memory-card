import { motion, AnimatePresence } from "framer-motion";
import DcComics from "../assets/other-images/dc_comics_logo.svg";
import { useSelector } from "react-redux";

export function Card({ image, name, playCard }) {
  const displayState = useSelector((state) => state.display);
  const { flipCard, cardAnimationDuration } = displayState;

  const duration = cardAnimationDuration / 1000;
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

  const styles = {
    cardWidth: 250,
    cardHeight: 425,
    card: "w-[160px] h-[240px] 2xl:w-[200px] 2xl:h-[300px] 3xl:w-[240px] 3xl:h-[360px] flex flex-col justify-center items-center cursor-pointer bg-card rounded-xl shadow-blue hover:shadow-skyBlue hover:text-sky-300",
    imageContainer: "pt-4 px-4",
    cardImage: "w-full rounded-xl",
    characterName:
      "flex justify-center items-center py-1 text-base xl:text-lg 2xl:text-xl 3xl:text-xl",
  };

  return (
    <AnimatePresence mode="wait">
      {flipCard ? (
        <motion.div
          key={image}
          className={styles.card}
          onClick={playCard}
          initial={initial}
          animate={animate}
          exit={exit}
        >
          <div className={styles.imageContainer}>
            <img className={styles.cardImage} src={image} alt="" />
          </div>
          <div className={styles.characterName}>{name}</div>
        </motion.div>
      ) : (
        <motion.div
          key={DcComics}
          className={styles.card}
          initial={initial}
          animate={animate}
          exit={exit}
        >
          <div className={styles.imageContainer}>
            <img className={styles.cardImage} src={DcComics} alt="" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
