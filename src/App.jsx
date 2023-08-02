import { useState, useEffect } from "react";
import "./App.css";
import GameModal from "./components/GameModal";
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
  const [cards, setCards] = useState([1, 2]);
  const [playedCards, setPlayedCards] = useState([]);
  const [level, setLevel] = useState(1);

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
    setLevelAnimationHeader();
  };

  const setLevelAnimationHeader = () => {
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
    setLevel(1);
  };

  const nextLevel = () => {
    setLevel((prevState) => prevState + 1);
    setCards((prevState) => [...prevState, cards.length + 1]);
    setPlayedCards([]);
    setLevelAnimation();
  };

  const gameOver = () => {
    toggleOverlay();
    setIsGameOver((prevState) => !prevState);
    setCards([1, 2]);
    setPlayedCards([]);
  };

  // Shuffle Cards after every clicked card
  useEffect(() => setCards(shuffleArray(cards)), [playedCards, cards]);

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
          <GameModal
            textContent={
              <>
                {" "}
                <h1 className="new-game-modal--header">
                  Animal theme memory game
                </h1>
                <h2 className="new-game-modal--subheader">
                  Hello, adventurer!
                </h2>
                <p className="new-game-modal--text">
                  Ready to find animals from our animal kingdom?
                </p>
                <p className="new-game-modal--text">
                  Click the same animal only once!
                </p>
              </>
            }
            callback={clickNewGame}
          />
        </main>
      ) : isGameOver ? (
        <main className="main-content-modal">
          <GameModal
            textContent={
              <>
                <h1 className="new-game-modal--header">Congratulations!</h1>
                <h2 className="new-game-modal--subheader">{`You reached level ${level}!`}</h2>
              </>
            }
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
