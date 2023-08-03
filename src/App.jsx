import { useState, useEffect } from "react";
import "./App.css";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import cardIcons from "./CardIcons";

const toggleOverlay = () => {
  const overlay = document.getElementById("overlay");
  overlay.classList.toggle("active");
};

function App() {
  const [isNewGame, setIsNewGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [cards, setCards] = useState([0, 1]);
  const [playedCards, setPlayedCards] = useState([]);
  const [level, setLevel] = useState(0);
  const topLevel = Math.floor(cardIcons.length / 2);

  const playCard = (cardNumber) => {
    if (!playedCards.includes(cardNumber)) {
      setPlayedCards((prevState) => [...prevState, cardNumber]);
    } else {
      gameOver();
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setLevelAnimation = () => {
    const levelHeader = document.querySelector(".header--level");
    levelHeader.classList.add("active");
    setTimeout(() => {
      levelHeader.classList.remove("active");
    }, 1500);
  };

  const clickNewGame = () => {
    if (!isNewGame) setIsNewGame((prevState) => !prevState);
    else if (isGameOver) setIsGameOver((prevState) => !prevState);
    toggleOverlay();
    setLevelAnimation();
    setLevel(0);
  };

  const nextLevel = () => {
    setLevel((prevState) => prevState + 1);
    setCards((prevState) => [...prevState, cards.length, cards.length + 1]);
    setPlayedCards([]);
    setLevelAnimation();
  };

  const gameOver = () => {
    toggleOverlay();
    setIsGameOver((prevState) => !prevState);
    setCards([0, 1]);
    setPlayedCards([]);
  };

  // Shuffle Cards after every clicked card
  useEffect(() => setCards(shuffleArray(cards)), [playedCards, cards]);

  // Check if the top level has been reached
  useEffect(() => {
    if (topLevel === level) {
      gameOver();
    }
  }, [level]);

  // Check if all cards in the level has been clicked
  useEffect(() => {
    if (playedCards.length === cards.length) {
      nextLevel();
    }
  }, [playedCards, cards]);

  return (
    <div className="wrapper">
      <Header level={level} />
      {!isNewGame ? (
        <main className="main-content-modal">
          <NewGameModal callback={clickNewGame} />
        </main>
      ) : isGameOver ? (
        <main className="main-content-modal">
          <RestartGameModal
            level={level}
            topLevel={topLevel}
            callback={clickNewGame}
          />
        </main>
      ) : (
        <main className="main-content-cards">
          {cards.map((card) => (
            <Card
              key={card}
              id={card}
              icon={cardIcons[card]}
              playCard={() => playCard(card)}
            />
          ))}
        </main>
      )}
      <Footer />
      <div id="overlay" className="active"></div>
    </div>
  );
}

export default App;
