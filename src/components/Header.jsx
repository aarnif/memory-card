import batmanLogo from "../assets/other-images/batman-logo.png";
import { Level } from "./Level";
import batmanTheme from "../assets/sounds/batman_1989_theme.mp3";
import ReactHowler from "react-howler";
import Icon from "@mdi/react";
import { mdiVolumeHigh, mdiVolumeOff, mdiMusic, mdiMusicOff } from "@mdi/js";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import {
  togglePlayMusicAction,
  togglePlaySoundAction,
} from "../reducers/display";
import muteButton from "../assets/sounds/mute_button.mp3";

export function Header() {
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

  const styles = {
    header:
      "bg-header flex justify-around items-center shadow-blue text-2xl lg:text-3xl xl:text-4xl p-2",
    ul: "flex justify-around items-center",
    li: "px-4",
    h1: "text-4xl xl:text-5xl 2xl:text-6xl",
    border:
      "group border-4 border-dc-blue rounded-full m-2 cursor-pointer hover:border-sky-300",
    iconContainer: "flex justify-around items-center p-1 xl:p-2",
    logoSize: "w-20 xl:w-24 2xl:w-28",
    icon: "w-8 xl:w-10 2xl:w-12 group-hover:text-sky-300",
  };

  return (
    <header className={styles.header}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <img className={styles.logoSize} src={batmanLogo} alt="Batman Logo" />
        </li>
        <li className={styles.li}>
          <h1 className={styles.h1}>Memory Game</h1>
        </li>
      </ul>
      <ul className={styles.ul}>
        <li className={styles.li}>Level: {level}</li>
        <li className={styles.li}>High Score: {highScore}</li>
        <li className={styles.border} onClick={togglePlaySound}>
          {playSound ? (
            <div className={styles.iconContainer}>
              <Icon path={mdiVolumeHigh} className={styles.icon} />
            </div>
          ) : (
            <div className={styles.iconContainer}>
              <Icon path={mdiVolumeOff} className={styles.icon} />
            </div>
          )}
        </li>
        <li className={styles.border} onClick={togglePlayMusic}>
          {playMusic ? (
            <div className={styles.iconContainer}>
              <Icon path={mdiMusic} className={styles.icon} />
            </div>
          ) : (
            <div className={styles.iconContainer}>
              <Icon path={mdiMusicOff} className={styles.icon} />
            </div>
          )}
        </li>
        <li className="w-0">
          {playMusic && (
            <ReactHowler src={batmanTheme} playing={true} volume={0.2} loop />
          )}
        </li>
      </ul>
      <Level key={level} level={level} />
    </header>
  );
}
