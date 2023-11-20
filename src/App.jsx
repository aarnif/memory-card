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
  toggleGameStart,
  toggleGameOver,
  increaseGameLevel,
  setGameLeveltoNull,
  setGameResult,
  updateHighScore,
  resetLevel,
} from "./reducers/game";
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
  const gameState = useSelector((state) => state.game);

  const {
    isGameStart,
    isGameOver,
    level,
    gameEndResult,
    highScore,
    cardsAddedPerLevel,
    topLevel,
  } = gameState;

  const [flipCard, setFlipCard] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [playMusic, setPlayMusic] = useState(false);

  const [playFlipSound] = useSound(cardFlip, { volume: 0.25 });

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
    showCardAnimation();
    dispatch(resetDeck(gameCards, cardsAddedPerLevel));
    dispatch(resetLevel());
  };

  const clickNewGame = () => {
    dispatch(toggleGameStart());
    toggleOverlay();
    resetGame();
    console.log("New game started!");
    console.log(`First level ${level}!`);
  };

  const clickRestartGame = () => {
    dispatch(toggleGameOver());
    toggleOverlay();
    resetGame();
    console.log("Restart game!");
    console.log(`First level ${level}!`);
  };

  const nextLevel = () => {
    dispatch(increaseGameLevel());
    dispatch(showNewCards(gameCards, cardsAddedPerLevel));
    console.log(`Next level ${level}!`);
  };

  const gameOver = () => {
    toggleOverlay();

    dispatch(toggleGameOver());
    dispatch(updateHighScore());
    dispatch(setGameResult());
    dispatch(setGameLeveltoNull());
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
