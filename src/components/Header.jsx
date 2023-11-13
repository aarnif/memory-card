import "./Header.css";
import DcComics from "../assets/other-images/dc_comics_logo.svg";

export function Header({ level, score, highScore }) {
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
      <div className="header--level">Level {level}</div>
    </header>
  );
}
