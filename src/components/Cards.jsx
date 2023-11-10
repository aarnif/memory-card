import { Card } from "./Card";
import "./Cards.css";

export function Cards({ cards, images, playCard }) {
  return (
    <main className="wrapper">
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card}
            id={card}
            icon={images[card]}
            playCard={() => playCard(card)}
          />
        ))}
      </div>
    </main>
  );
}
