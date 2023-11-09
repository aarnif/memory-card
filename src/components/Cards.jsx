import React from "react";
import { Card } from "./Card";
import "./Cards.css";

export function Cards({ cards, images, playCard }) {
  return (
    <main className="main-content-cards">
      {cards.map((card) => (
        <Card
          key={card}
          id={card}
          icon={images[card]}
          playCard={() => playCard(card)}
        />
      ))}
    </main>
  );
}
