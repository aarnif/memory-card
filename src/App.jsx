import { useState, useEffect } from "react";
import { loadCardData } from "./utils/loadCardData";
import { shuffleArray, setLevelAnimation, toggleOverlay } from "./utils/game";
import "./App.css";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";

function App() {
  const [isNewGame, setIsNewGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [cards, setCards] = useState([]);
  const [level, setLevel] = useState(0);

  // Start counting levels from 1
  const shownLevel = level + 1;
  // Divide by two because two cards are added each level
  const topLevel = cards.length / 2;
  // Shuffle cards at each render
  const shuffledCards = shuffleArray(cards);
  const clickedCards = cards.filter((card) => card.isClicked);

  useEffect(() => {
    loadCardData().then((cardData) => {
      setCardData(cardData);
      setCards(cardData.slice(0, 2));
      console.log(cardData);
    });
  }, []);

  // Check if top level has been reached
  useEffect(() => {
    if (topLevel === level) {
      gameOver();
    }
  }, [level]);

  // Check if all cards in the level has been clicked
  useEffect(() => {
    if (cards.length > 0 && clickedCards.length === cards.length) {
      nextLevel();
    }
  }, [clickedCards, cards]);

  const playCard = (cardId) => {
    const findCard = clickedCards.find((card) => card.id === cardId);
    if (!findCard) {
      const playCard = cards.map((card) =>
        card.id === cardId ? { ...card, isClicked: true } : card
      );
      setCards(playCard);
    } else {
      gameOver();
    }
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
    setCards((prevState) => cardData.slice(0, prevState.length + 2));
    setLevelAnimation();
  };

  const gameOver = () => {
    toggleOverlay();
    setIsGameOver((prevState) => !prevState);
    setCards(cardData.slice(0, 2));
  };

  return (
    <>
      <Header level={shownLevel} />
      {!isNewGame ? (
        <main className="main-content-modal">
          <NewGameModal callback={clickNewGame} />
        </main>
      ) : isGameOver ? (
        <main className="main-content-modal">
          <RestartGameModal
            level={level}
            topLevel={topLevel}
            shownLevel={shownLevel}
            callback={clickNewGame}
          />
        </main>
      ) : (
        <Cards cards={shuffledCards} playCard={playCard} />
      )}
      <Footer />
      <div id="overlay" className="active"></div>
    </>
  );
}

export default App;
