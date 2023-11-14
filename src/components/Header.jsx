import "./Header.css";
import DcComics from "../assets/other-images/dc_comics_logo.svg";
import { Level } from "./Level";
import batmanTheme from "../assets/sounds/batman_1989_theme.mp3";
import ReactHowler from "react-howler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

export function Header({
  level,
  shownLevel,
  score,
  highScore,
  playMusic,
  togglePlayMusic,
}) {
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
        <li>Score: {score}</li>
        <li>High Score: {highScore}</li>
        <li className="header--volume-icon" onClick={togglePlayMusic}>
          {playMusic ? (
            <FontAwesomeIcon icon={faVolumeHigh} style={volumeIconStyle} />
          ) : (
            <FontAwesomeIcon icon={faVolumeXmark} style={volumeIconStyle} />
          )}
        </li>
        <li className="header--music-howler">
          {playMusic && (
            <ReactHowler src={batmanTheme} playing={true} volume={0.2} loop />
          )}
        </li>
      </ul>
      <Level level={level} shownlevel={shownLevel} />
    </header>
  );
}
