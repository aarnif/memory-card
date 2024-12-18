import { useSelector, useDispatch } from "react-redux";
import { resetLevel, toggleGameOver } from "../reducers/game";
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

const GameOver = () => {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, gameEndResult, cardsAddedPerLevel, topLevel } = gameState;
  const { playSound } = displayState;

  const [playClickSound] = useSound(clickButton, {
    volume: playSound ? 0.25 : 0,
  });

  const [nextLevelSound] = useSound(levelNext, {
    volume: playSound ? 0.25 : 0,
  });

  const clickRestartGame = () => {
    playClickSound();

    setTimeout(() => {
      dispatch(toggleGameOver());
      dispatch(toggleShowOverlayAction());
      dispatch(toggleShowLevelAction(nextLevelSound));
      dispatch(setNewGameCardAnimationAction());
      dispatch(resetDeck(gameCards, cardsAddedPerLevel));
      dispatch(resetLevel());
    }, 100);

    console.log("Restart game!");
    console.log(`First level ${level}!`);
  };

  return (
    <motion.div
      key="overlay"
      className="inset-0 fixed flex justify-center items-center bg-black bg-opacity-70"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key="game-over-modal"
        className="relative z-10 bg-zinc-950 bg-opacity-70 rounded-xl shadow-blue flex flex-col justify-center items-center pt-10 px-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <h1 className="text-4xl pb-4">Game Over!</h1>

        {gameEndResult === topLevel ? (
          <>
            <p className="text-3xl text-center py-1">Congratulations!</p>
            <p className="text-3xl text-center py-1">
              You reached the end of the game!
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl text-center py-1">{`You reached`}</p>
            <p className="text-3xl text-center py-1">{`level ${gameEndResult}!`}</p>
          </>
        )}
        <motion.button
          className="shadow-blue hover:shadow-skyBlue hover:bg-zinc-900 rounded-xl text-3xl text-center text-shadow py-3 px-9 m-4 hover:text-sky-300"
          onClick={clickRestartGame}
          whileTap={{ scale: 0.9 }}
        >
          Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameOver;
