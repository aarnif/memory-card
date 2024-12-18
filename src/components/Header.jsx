import dcComicsLogo from "../assets/other-images/dc_comics_logo.svg";
import batmanTheme from "../assets/sounds/batman_1989_theme.mp3";
import ReactHowler from "react-howler";
import Icon from "@mdi/react";
import { mdiVolumeHigh, mdiVolumeOff, mdiMusic, mdiMusicOff } from "@mdi/js";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import { motion } from "framer-motion";
import {
  togglePlayMusicAction,
  togglePlaySoundAction,
} from "../reducers/display";
import muteButton from "../assets/sounds/mute_button.mp3";

export function Header({ animationTransition }) {
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, highScore } = gameState;
  const { playMusic, playSound } = displayState;

  const [playMuteSound] = useSound(muteButton, {
    volume: 0.4,
  });

  const togglePlaySound = () => {
    console.log("Sound toggled!");
    playMuteSound();
    dispatch(togglePlaySoundAction());
  };

  const togglePlayMusic = () => {
    console.log("Music toggled!");
    playMuteSound();
    dispatch(togglePlayMusicAction());
  };

  return (
    <motion.header
      className="w-full flex justify-around items-center bg-header shadow-blue text-lg lg:text-xl xl:text-2xl font-extrabold p-2"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ...animationTransition, duration: 0.5 }}
    >
      <ul className="flex justify-around items-center">
        <li className="px-4">
          <img
            className="w-12 xl:w-16 2xl:w-20"
            src={dcComicsLogo}
            alt="Batman Logo"
          />
        </li>
        <li className="px-4">
          <h1 className="text-2xl xl:text-3xl 2xl:text-4xl">Memory Game</h1>
        </li>
      </ul>
      <ul className="flex justify-around items-center">
        <li className="px-4">Level: {level}</li>
        <li className="px-4">High Score: {highScore}</li>
        <li
          className="group border-4 border-dc-blue rounded-full m-2 cursor-pointer hover:border-sky-300 active:scale-95 transition"
          onClick={togglePlaySound}
        >
          {playSound ? (
            <div className="flex justify-around items-center p-1 xl:p-2 transition">
              <Icon
                path={mdiVolumeHigh}
                className="w-8 xl:w-10 2xl:w-12 group-hover:text-sky-300 transition"
              />
            </div>
          ) : (
            <div className="flex justify-around items-center p-1 xl:p-2 transition">
              <Icon
                path={mdiVolumeOff}
                className="w-8 xl:w-10 2xl:w-12 group-hover:text-sky-300 transition"
              />
            </div>
          )}
        </li>
        <li
          className="group border-4 border-dc-blue rounded-full m-2 cursor-pointer hover:border-sky-300 active:scale-95 transition"
          onClick={togglePlayMusic}
        >
          {playMusic ? (
            <div className="flex justify-around items-center p-1 xl:p-2 transition">
              <Icon
                path={mdiMusic}
                className="w-8 xl:w-10 2xl:w-12 group-hover:text-sky-300 transition"
              />
            </div>
          ) : (
            <div className="flex justify-around items-center p-1 xl:p-2 transition">
              <Icon
                path={mdiMusicOff}
                className="w-8 xl:w-10 2xl:w-12 group-hover:text-sky-300 transition"
              />
            </div>
          )}
        </li>
        <li className="w-0">
          {playMusic && (
            <ReactHowler src={batmanTheme} playing={true} volume={0.2} loop />
          )}
        </li>
      </ul>
    </motion.header>
  );
}
