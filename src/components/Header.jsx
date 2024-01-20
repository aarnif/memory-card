import "./Header.css";
import DcComics from "../assets/other-images/dc_comics_logo.svg";
import { Level } from "./Level";
import batmanTheme from "../assets/sounds/batman_1989_theme.mp3";
import ReactHowler from "react-howler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faMusic } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePlayMusicAction,
  togglePlaySoundAction,
} from "../reducers/display";
import MuteSign from "./MuteSign";

export function Header() {
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);

  const { level, highScore } = gameState;
  const { playMusic, playSound } = displayState;

  const dispatch = useDispatch();

  const togglePlaySound = () => {
    console.log("Sound toggled!");
    dispatch(togglePlaySoundAction());
  };

  const togglePlayMusic = () => {
    console.log("Music toggled!");
    dispatch(togglePlayMusicAction());
  };

  const volumeIconStyle = {
    color: "#0077f2",
    "&:hover": {
      color: "#ff0000",
    },
  };

  return (
    <header className="header">
      <ul className="header--logo-and-title">
        <li>
          <img className="header--logo" src={DcComics} alt="DC Comics Logo" />
        </li>
        <li>
          <h1 className="header--title">Memory Game</h1>
        </li>
      </ul>
      <ul className="header--score">
        <li>Level: {level}</li>
        <li>High Score: {highScore}</li>
        <li className="header--sound-icon" onClick={togglePlaySound}>
          {playSound ? (
            <FontAwesomeIcon icon={faVolumeHigh} style={volumeIconStyle} />
          ) : (
            <>
              <FontAwesomeIcon icon={faVolumeHigh} style={volumeIconStyle} />
              <MuteSign />
            </>
          )}
        </li>
        <li className="header--sound-icon" onClick={togglePlayMusic}>
          {playMusic ? (
            <FontAwesomeIcon icon={faMusic} style={volumeIconStyle} />
          ) : (
            <>
              <FontAwesomeIcon icon={faMusic} style={volumeIconStyle} />
              <MuteSign />
            </>
          )}
        </li>
        <li className="header--music-howler">
          {playMusic && (
            <ReactHowler src={batmanTheme} playing={true} volume={0.2} loop />
          )}
        </li>
      </ul>
      <Level key={level} level={level} />
    </header>
  );
}
