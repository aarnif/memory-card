import "./Header.css";

export function Header(props) {
  return (
    <header className="header">
      <h1 className="header--title">Memory Game</h1>
      <div className="header--level">Level {props.level}</div>
    </header>
  );
}
