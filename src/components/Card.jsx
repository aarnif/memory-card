import "./Card.css";

export function Card({ playCard, image, name, showCard, animationDuration }) {
  const style = {
    transform: showCard
      ? "rotate3d(0, 0, 0, 0deg)"
      : "rotate3d(0, -1, 0, 90deg)",
    animation: showCard ? `rotate ${animationDuration}ms ease-in-out` : "none",
  };

  return (
    <div style={style} className="character-card" onClick={playCard}>
      <img className="character--image" src={image} alt="" />
      <div className="character--name">{name}</div>
    </div>
  );
}
