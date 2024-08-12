import { useSelector, useDispatch } from "react-redux";
import { toggleGameStart, resetLevel } from "../reducers/game";
import { resetDeck } from "../reducers/cards";
import {
  toggleShowOverlayAction,
  toggleShowLevelAction,
  setNewGameCardAnimationAction,
} from "../reducers/display";
import useSound from "use-sound";
import clickButton from "../assets/sounds/new_game_click.mp3";
import levelNext from "../assets/sounds/arcade_ui_27.mp3";
import { motion } from "framer-motion";

const NewGameModal = () => {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, cardsAddedPerLevel } = gameState;
  const { playSound } = displayState;

  const [playClickSound] = useSound(clickButton, {
    volume: playSound ? 0.25 : 0,
  });

  const [nextLevelSound] = useSound(levelNext, {
    volume: playSound ? 0.25 : 0,
  });

  const clickNewGame = () => {
    playClickSound();

    setTimeout(() => {
      dispatch(toggleGameStart());
      dispatch(toggleShowOverlayAction());
      dispatch(toggleShowLevelAction(nextLevelSound));
      dispatch(setNewGameCardAnimationAction());
      dispatch(resetDeck(gameCards, cardsAddedPerLevel));
      dispatch(resetLevel());
    }, 100);

    console.log("New game started!");
    console.log(`First level ${level}!`);
  };

  const styles = {
    container:
      "relative top-[-100px] z-10 bg-zinc-800 rounded-xl shadow-blue flex flex-col justify-center items-center pt-10 px-10",
    header: "text-4xl pb-4",
    text: "text-2xl text-center py-1",
    button:
      "shadow-blue hover:shadow-skyBlue hover:bg-zinc-900 rounded-xl text-3xl text-center py-3 px-9 m-4 hover:text-sky-300",
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to Gotham City!</h1>
      <p className={styles.text}>Click each character once to level up.</p>
      <p className={styles.text}>Each level adds two new characters.</p>
      <p className={styles.text}>Ready to test your memory? Click Begin!</p>
      <motion.button
        className={styles.button}
        onClick={clickNewGame}
        whileTap={{ scale: 0.9 }}
      >
        Begin
      </motion.button>
    </div>
  );
};

export default NewGameModal;
