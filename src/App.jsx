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
  const [gameCards, setGameCards] = useState([]);
  const [level, setLevel] = useState(0);
  const [showCard, setShowCard] = useState(false);

  // Start counting levels from 1
  const shownLevel = level + 1;
  // Divide by two because two cards are added each level
  const topLevel = gameCards.length / 2;
  // Shuffle cards at each render
  const shuffledCards = shuffleArray(gameCards);
  const clickedCards = gameCards.filter((card) => card.isClicked);

  const animationDuration = 700;

  useEffect(() => {
    loadCardData().then((cardData) => {
      setCardData(shuffleArray(cardData));
      setGameCards(cardData.slice(0, 2));
      console.log(cardData);
    });
  }, []);

  // Check if top level has been reached
  useEffect(() => {
    if (checkIfTopLevelAchieved()) {
      gameOver();
    }
  }, [level]);

  useEffect(() => {
    if (checkIfAllCardsAreClicked()) {
      nextLevel();
    }
  }, [clickedCards, gameCards]);

  const checkIfAllCardsAreClicked = () =>
    gameCards.length > 0 && clickedCards.length === gameCards.length;

  const checkIfTopLevelAchieved = () => topLevel === level;

  const playCard = (cardId) => {
    const findCard = clickedCards.find((card) => card.id === cardId);
    if (!findCard) {
      const playCard = gameCards.map((card) =>
        card.id === cardId ? { ...card, isClicked: true } : card
      );
      setGameCards(playCard);
      showCardAnimation();
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
    showCardAnimation();
  };

  const nextLevel = () => {
    setLevel((prevState) => prevState + 1);
    setGameCards((prevState) => cardData.slice(0, prevState.length + 2));
    setLevelAnimation();
    showCardAnimation();
  };

  const gameOver = () => {
    toggleOverlay();
    setIsGameOver((prevState) => !prevState);
    setGameCards(cardData.slice(0, 2));
  };

  const showCardAnimation = () => {
    setShowCard(false);
    setTimeout(() => {
      setShowCard(true);
    }, animationDuration);
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
        <Cards
          cards={shuffledCards}
          playCard={playCard}
          showCard={showCard}
          animationDuration={animationDuration}
        />
      )}
      <Footer />
      <div id="overlay" className="active"></div>
    </>
  );
}

export default App;
