import { useState, useEffect } from "react";
import useSound from "use-sound";
import { characters } from "./utils/characterData";
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
  const [cardData, setCardData] = useState(characters);
  const [gameCards, setGameCards] = useState([]);
  const [level, setLevel] = useState(null);
  const [highScore, setHighScore] = useState(null);
  const [flipCard, setFlipCard] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [playMusic, setPlayMusic] = useState(false);
  const [gameEndResult, setGameEndResult] = useState(null);

  const [playFlipSound] = useSound(cardFlip, { volume: 0.25 });

  const cardsAddedPerLevel = 2;
  const topLevel = cardData.length / cardsAddedPerLevel;
  const clickedCards = gameCards.filter((card) => card.isClicked);
  const cardAnimationDuration = 1000;

  useEffect(() => {
    if (checkIfTopLevelAchieved()) {
      gameOver();
    }
  }, [level]);

  useEffect(() => {
    if (checkIfAllCardsAreClicked()) {
      console.log("Current game cards:");
      console.table(gameCards);
      nextLevel();
    }
  }, [clickedCards, gameCards]);

  const checkIfAllCardsAreClicked = () =>
    gameCards.length > 0 && clickedCards.length === gameCards.length;

  const checkIfTopLevelAchieved = () => topLevel === level;

  const resetClickedCards = () => {
    return gameCards.map((card) => ({ ...card, isClicked: false }));
  };

  const addNewCards = () => {
    const newGameCards = [];
    const shuffledCardData = shuffleArray(cardData);
    let counter = 0;
    let index = 0;
    while (counter < cardsAddedPerLevel) {
      const findCard = gameCards.find(
        (card) => card.id === shuffledCardData[index].id
      );
      if (!findCard) {
        console.log("Add new card:");
        console.log(shuffledCardData[index]);
        newGameCards.push(shuffledCardData[index]);
        counter++;
      }
      index++;
    }
    return [...resetClickedCards(), ...newGameCards];
  };

  const playCard = (cardId) => {
    const findCard = clickedCards.find((card) => card.id === cardId);
    if (!findCard) {
      const playCard = gameCards.map((card) =>
        card.id === cardId ? { ...card, isClicked: true } : card
      );
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

  const resetGame = () => {
    const shuffledCardData = shuffleArray(cardData);
    setGameCards(shuffledCardData.slice(0, cardsAddedPerLevel));
    setLevel(1);
    showCardAnimation();
  };

  const clickNewGame = () => {
    setIsNewGame((prevState) => !prevState);
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
    const nextLevel = level + 1;
    setLevel(nextLevel);
    setGameCards(addNewCards());
    console.log(`Next level ${nextLevel}!`);
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
      {!isNewGame ? (
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
          cards={gameCards}
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
