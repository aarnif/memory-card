import "./Header.css";
import DcComics from "../assets/other-images/dc_comics_logo.svg";

export function Header(props) {
  return (
    <header className="header">
      <img className="header--icon" src={DcComics}></img>
      <div className="header--level">Level {props.level}</div>
    </header>
  );
}
