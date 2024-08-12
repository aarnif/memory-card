import { useSelector, useDispatch } from "react-redux";
import { resetLevel, toggleGameOver } from "../reducers/game";
import { resetDeck } from "../reducers/cards";
import {
  toggleShowOverlayAction,
  setNewGameCardAnimationAction,
} from "../reducers/display";
import useSound from "use-sound";
import cardFlip from "../assets/sounds/card_flip.wav";
import clickButton from "../assets/sounds/new_game_click.mp3";
import { motion } from "framer-motion";

const GameModal = () => {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, gameEndResult, cardsAddedPerLevel, topLevel } = gameState;
  const { playSound } = displayState;

  const [playFlipSound] = useSound(cardFlip, {
    volume: playSound ? 0.25 : 0,
  });

  const [playClickSound] = useSound(clickButton, {
    volume: playSound ? 0.25 : 0,
  });

  const clickRestartGame = () => {
    playClickSound();

    setTimeout(() => {
      dispatch(toggleGameOver());
      dispatch(toggleShowOverlayAction());
      dispatch(setNewGameCardAnimationAction(playFlipSound));
      dispatch(resetDeck(gameCards, cardsAddedPerLevel));
      dispatch(resetLevel());
    }, 100);

    console.log("Restart game!");
    console.log(`First level ${level}!`);
  };

  const styles = {
    container:
      "relative top-[-100px] z-10 bg-zinc-800 rounded-xl shadow-blue flex flex-col justify-center items-center pt-10 px-20",
    header: "text-4xl pb-4",
    text: "text-2xl text-center py-1",
    button:
      "shadow-blue hover:shadow-skyBlue hover:bg-zinc-900 rounded-xl text-3xl text-center py-3 px-9 m-4 hover:text-sky-300",
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Game Over!</h1>

      {gameEndResult === topLevel ? (
        <>
          <p className={styles.text}>Congratulations!</p>
          <p className={styles.text}>You reached the end of the game! </p>
        </>
      ) : (
        <>
          <p className={styles.text}>{`You reached level ${gameEndResult}!`}</p>
          <p className={styles.text}>Ready to try again?</p>
        </>
      )}
      <motion.button
        className={styles.button}
        onClick={clickRestartGame}
        whileTap={{ scale: 0.9 }}
      >
        New Game
      </motion.button>
    </div>
  );
};

export default GameModal;
