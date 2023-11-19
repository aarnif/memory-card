import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import {
  iniatilizeCards,
  showNewCards,
  resetDeck,
  shuffleDeck,
} from "./reducers/cards";
import {
  checkIfAllCardsHaveBeenClicked,
  checkIfTopLevelAchieved,
} from "./utils/game";
import "./App.css";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";
import { Overlay } from "./components/Overlay";
import cardFlip from "./assets/sounds/card_flip.wav";

function App() {
  const gameCards = useSelector((state) => state.cards);

  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(null);
  const [highScore, setHighScore] = useState(null);
  const [flipCard, setFlipCard] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [playMusic, setPlayMusic] = useState(false);
  const [gameEndResult, setGameEndResult] = useState(null);

  const [playFlipSound] = useSound(cardFlip, { volume: 0.25 });

  const cardsAddedPerLevel = 2;
  const topLevel = gameCards.length / cardsAddedPerLevel;
  const cardAnimationDuration = 1000;
  const clickedCards = gameCards.filter((card) => card.isClicked);
  const shownCards = gameCards.filter((card) => card.isShown);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(iniatilizeCards());
  }, []);

  useEffect(() => {
    if (checkIfTopLevelAchieved(topLevel, level)) {
      gameOver();
    }
  }, [level]);

  useEffect(() => {
    if (checkIfAllCardsHaveBeenClicked(clickedCards, shownCards)) {
      console.log("Current game cards:");
      console.table(gameCards);
      nextLevel();
    }
  }, [clickedCards, gameCards]);

  const playCard = (cardId) => {
    const findCard = clickedCards.find((card) => card.id === cardId);
    if (!findCard) {
      const playCard = gameCards.map((card) =>
        card.id === cardId ? { ...card, isClicked: true } : card
      );
      showCardAnimation();
      setTimeout(
        // set cards in the middle of the animation
        () => dispatch(shuffleDeck(playCard)),
        cardAnimationDuration / 2
      );
    } else {
      gameOver();
    }
  };

  const resetGame = () => {
    setLevel(1);
    showCardAnimation();
    dispatch(resetDeck(gameCards, cardsAddedPerLevel));
  };

  const clickNewGame = () => {
    setIsGameStart((prevState) => !prevState);
    toggleOverlay();
    resetGame();
    console.log("New game started!");
    console.log(`First level ${level}!`);
  };

  const clickRestartGame = () => {
    setIsGameOver((prevState) => !prevState);
    toggleOverlay();
    resetGame();
    console.log("Restart game!");
    console.log(`First level ${level}!`);
  };

  const nextLevel = () => {
    setLevel((prevState) => prevState + 1);
    dispatch(showNewCards(gameCards, cardsAddedPerLevel));
    console.log(`Next level ${level}!`);
  };

  const gameOver = () => {
    toggleOverlay();
    setIsGameOver((prevState) => !prevState);
    setHighScore((prevState) => (level > prevState ? level : prevState));
    setGameEndResult(level);
    setLevel(null);
    console.log("Game over!");
  };

  const showCardAnimation = () => {
    console.log("Card animation started!");
    setFlipCard(false);
    playFlipSound();
    setTimeout(() => {
      setFlipCard(true);
      playFlipSound();
    }, cardAnimationDuration);
  };

  const toggleOverlay = () => {
    console.log("Overlay toggled!");
    setShowOverlay((prevState) => !prevState);
  };

  const togglePlayMusic = () => {
    console.log("Music toggled!");
    setPlayMusic((prevState) => !prevState);
  };

  return (
    <>
      <Header
        level={level}
        highScore={highScore}
        playMusic={playMusic}
        togglePlayMusic={togglePlayMusic}
      />
      {!isGameStart ? (
        <main className="main-content-modal">
          <NewGameModal callback={clickNewGame} />
        </main>
      ) : isGameOver ? (
        <main className="main-content-modal">
          <RestartGameModal
            gameEndResult={gameEndResult}
            topLevel={topLevel}
            callback={clickRestartGame}
          />
        </main>
      ) : (
        <Cards
          cards={shownCards}
          playCard={playCard}
          flipCard={flipCard}
          animationDuration={cardAnimationDuration}
        />
      )}
      <Footer />
      <Overlay showOverlay={showOverlay} />
    </>
  );
}

export default App;
