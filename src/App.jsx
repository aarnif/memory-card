import { useState, useEffect } from "react";
import "./App.css";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";

const toggleOverlay = () => {
  const overlay = document.getElementById("overlay");
  overlay.classList.toggle("active");
};

function App() {
  const [images, setImages] = useState([]);
  const [isNewGame, setIsNewGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [cards, setCards] = useState([0, 1]);
  const [playedCards, setPlayedCards] = useState([]);
  const [level, setLevel] = useState(0);

  // Load all card images dynamically at first render
  useEffect(() => {
    const loadImages = async () => {
      const importAll = import.meta.glob("./assets/card-images/*.png");
      const imgs = [];
      for (const path in importAll) {
        const img = await importAll[path]();
        imgs.push(img.default);
      }
      setImages((prevState) => [...prevState, ...imgs]);
    };
    loadImages();
  }, []);

  // Check if top level has been reached
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

  // Start counting levels from 1
  const shownLevel = level + 1;
  // Divide by two because two cards are added each level
  const topLevel = images.length / 2;
  // Shuffle cards at each render
  // const shuffledCards = shuffleArray(cards);
  const shuffledCards = cards;

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
        <Cards cards={shuffledCards} images={images} playCard={playCard} />
      )}
      <Footer />
      <div id="overlay" className="active"></div>
    </>
  );
}

export default App;
