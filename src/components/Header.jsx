// import "./Header.css";
import DcComics from "../assets/other-images/dc_comics_logo.svg";
import { Level } from "./Level";
import batmanTheme from "../assets/sounds/batman_1989_theme.mp3";
import ReactHowler from "react-howler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faMusic,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
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
      "bg-header flex justify-around items-center shadow-blue text-3xl 2xl:text-4xl p-2",
    ul: "flex justify-around items-center",
    li: "px-4",
    h1: "text-5xl 2xl:text-6xl",
    border:
      "border-4 border-dc-blue rounded-[50%] m-2 cursor-pointer hover:border-sky-300",
    iconContainer: "flex justify-around items-center relative p-6 2xl:p-8",
    iconPosition: "absolute",
    iconSize: "2xl",
  };

  return (
    <header className={styles.header}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <img className="w-24" src={DcComics} alt="DC Comics Logo" />
        </li>
        <li className={styles.li}>
          <h1 className="text-5xl 2xl:text-6xl">Memory Game</h1>
        </li>
      </ul>
      <ul className={styles.ul}>
        <li className={styles.li}>Level: {level}</li>
        <li className={styles.li}>High Score: {highScore}</li>
        <li className={styles.border} onClick={togglePlaySound}>
          {playSound ? (
            <div className={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faVolumeHigh}
                className={styles.iconPosition}
              />
            </div>
          ) : (
            <div className={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faVolumeHigh}
                className={styles.iconPosition}
              />
              <FontAwesomeIcon
                icon={faBan}
                size={styles.iconSize}
                className={styles.iconPosition}
              />
            </div>
          )}
        </li>
        <li className={styles.border} onClick={togglePlayMusic}>
          {playMusic ? (
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faMusic} className={styles.iconPosition} />
            </div>
          ) : (
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faMusic} className={styles.iconPosition} />
              <FontAwesomeIcon
                icon={faBan}
                size={styles.iconSize}
                className={styles.iconPosition}
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
      <Level key={level} level={level} />
    </header>
  );
}
