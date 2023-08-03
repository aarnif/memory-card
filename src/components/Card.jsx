import "./Card.css";

export function Card(props) {
  return (
    <div className="card" onClick={props.playCard}>
      <img className="card--character" src={props.icon} alt="" />
    </div>
  );
}
