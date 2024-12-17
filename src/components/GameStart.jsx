import { useSelector, useDispatch } from "react-redux";
import { toggleGameStart } from "../reducers/game";
import { toggleShowLevelAction } from "../reducers/display";
import dcComicsLogo from "../assets/other-images/dc_comics_logo.svg";
import useSound from "use-sound";
import clickButton from "../assets/sounds/new_game_click.mp3";
import levelNext from "../assets/sounds/arcade_ui_27.mp3";
import { motion } from "framer-motion";

const GameStart = () => {
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { playSound } = displayState;

  const [playClickSound] = useSound(clickButton, {
    volume: playSound ? 0.25 : 0,
  });

  const [nextLevelSound] = useSound(levelNext, {
    volume: playSound ? 0.25 : 0,
  });

  const animationTransition = {
    delay: 2,
    duration: 1,
  };

  const clickNewGame = () => {
    playClickSound();
    dispatch(toggleGameStart());
    console.log("New game started!");

    // Start the level animation after the new game animation
    setTimeout(() => {
      dispatch(toggleShowLevelAction(nextLevelSound));
    }, (animationTransition.delay + animationTransition.duration) * 1000);
  };

  return (
    <motion.div
      key="overlay"
      className="inset-0 fixed flex justify-center items-center bg-black"
      exit={{
        opacity: 0,
      }}
      transition={animationTransition}
    >
      <motion.div
        key="background"
        className="inset-0 fixed flex justify-center items-center bg-new-game bg-center bg-cover bg-no-repeat bg-black bg-opacity-80 bg-blend-overlay"
        initial={{
          opacity: 0,
          scale: 2,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: animationTransition.duration,
          },
        }}
        exit={{
          opacity: 0,
          scale: 2,
          transition: {
            delay: animationTransition.delay / 2,
            duration: 0.5,
          },
        }}
      >
        <motion.div
          className="relative z-10 flex flex-col justify-center items-center pt-10 px-10 font-['batman-forever']"
          initial={{
            opacity: 0,
            scale: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              delay: animationTransition.delay / 2,
              duration: 0.5,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0,
            y: 100,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <div className="flex flex-col justify-center items-center mb-8">
            <img src={dcComicsLogo} alt="" className="w-24" />
            <h1 className="text-8xl pb-4">BATMAN</h1>
          </div>
          <h2 className="text-4xl text-center py-1">Memory Game</h2>
          <motion.button
            className="shadow-blue hover:shadow-skyBlue hover:bg-zinc-900 rounded-xl text-3xl text-center py-3 px-9 m-4 hover:text-sky-300"
            onClick={clickNewGame}
            whileTap={{ scale: 0.9 }}
          >
            Begin
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameStart;
