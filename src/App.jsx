import { useState, useEffect } from "react";
import useSound from "use-sound";
import { loadCardData } from "./utils/loadCardData";
import { shuffleArray } from "./utils/game";
import "./App.css";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";
import { Overlay } from "./components/Overlay";
import cardFlip from "./assets/sounds/card_flip.wav";

function App() {
  const [isNewGame, setIsNewGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [gameCards, setGameCards] = useState([]);
  const [level, setLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const [playFlipSound] = useSound(cardFlip, { volume: 0.2 });

  const cardsAddedPerLevel = 2;
  // Start counting levels from 1
  const shownLevel = level + 1;
  // Divide by two because two cards are added each level
  const topLevel = cardData.length / cardsAddedPerLevel;
  const clickedCards = gameCards.filter((card) => card.isClicked);
  const cardAnimationDuration = 1000;

  useEffect(() => {
    loadCardData().then((cardData) => {
      const shuffledCardData = shuffleArray(cardData);
      setCardData(shuffledCardData);
      setGameCards(shuffledCardData.slice(0, cardsAddedPerLevel));
      console.log(shuffledCardData);
    });
  }, []);

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
      setScore((prevState) => prevState + 1);
      showCardAnimation();
      setTimeout(
        // set cards in the middle of the animation
        () => setGameCards(shuffleArray(playCard)),
        cardAnimationDuration / 2
      );
    } else {
      gameOver();
    }
  };

  const clickNewGame = () => {
    if (!isNewGame) setIsNewGame((prevState) => !prevState);
    else if (isGameOver) setIsGameOver((prevState) => !prevState);
    toggleOverlay();
    setLevel(0);
    setScore(0);
    showCardAnimation();
  };

  const nextLevel = () => {
    setLevel((prevState) => prevState + 1);
    setGameCards((prevState) =>
      cardData.slice(0, prevState.length + cardsAddedPerLevel)
    );
  };

  const gameOver = () => {
    toggleOverlay();
    setIsGameOver((prevState) => !prevState);
    setGameCards(cardData.slice(0, cardsAddedPerLevel));
    setHighScore((prevState) => (score > prevState ? score : prevState));
  };

  const showCardAnimation = () => {
    setShowCard(false);
    playFlipSound();
    setTimeout(() => {
      setShowCard(true);
      playFlipSound();
    }, cardAnimationDuration);
  };

  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
  };

  return (
    <>
      <Header
        shownLevel={shownLevel}
        level={level}
        score={score}
        highScore={highScore}
      />
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
          cards={gameCards}
          playCard={playCard}
          showCard={showCard}
          animationDuration={cardAnimationDuration}
        />
      )}
      <Footer />
      <Overlay showOverlay={showOverlay} />
    </>
  );
}

export default App;
