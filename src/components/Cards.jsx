import { Card } from "./Card";
import "./Cards.css";

export function Cards({ cards, playCard, showCard, animationDuration }) {
  return (
    <main className="wrapper">
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            name={card.name}
            playCard={() => playCard(card.id)}
            showCard={showCard}
            animationDuration={animationDuration}
          />
        ))}
      </div>
    </main>
  );
}
