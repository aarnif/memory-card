import "./Card.css";

export function Card({ playCard, image, name }) {
  return (
    <div className="character-card" onClick={playCard}>
      <img className="character--image" src={image} alt="" />
      <div className="character--name">{name}</div>
    </div>
  );
}
