import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Card(props) {
  return (
    <div className="card" onClick={props.playCard}>
      <FontAwesomeIcon
        icon={props.icon}
        size="2xl"
        style={{ color: "#ffffff" }}
      />
    </div>
  );
}
