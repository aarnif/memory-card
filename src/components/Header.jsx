import "./Header.css";
import DcComics from "../assets/other-images/dc_comics_logo.svg";
import { Level } from "./Level";

export function Header({ level, shownLevel, score, highScore }) {
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
      </ul>
      <Level level={level} shownlevel={shownLevel} />
    </header>
  );
}
