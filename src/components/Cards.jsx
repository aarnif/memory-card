import { Card } from "./Card";
import "./Cards.css";

export function Cards({ cards, playCard }) {
  return (
    <main className="wrapper">
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            icon={card.image}
            playCard={() => playCard(card.id)}
          />
        ))}
      </div>
    </main>
  );
}
