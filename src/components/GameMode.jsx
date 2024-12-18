import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import { motion } from "framer-motion";
import { showNewCards, shuffleDeck, resetDeck } from "../reducers/cards";
import {
  toggleGameOver,
  increaseGameLevel,
  setGameResult,
  updateHighScore,
  resetLevel,
} from "../reducers/game";
import {
  toggleShowOverlayAction,
  toggleShowLevelAction,
  setClickCardAnimationAction,
  setNewGameCardAnimationAction,
} from "../reducers/display";
import cardFlip from "../assets/sounds/card_flip.wav";
import { Header } from "./Header";
import Card from "./Card";
import { Level } from "./Level";
import { Footer } from "./Footer";

export function GameMode() {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, cardsAddedPerLevel, topLevel } = gameState;
  const { playSound, cardAnimationDuration, showLevel } = displayState;

  const [playFlipSound] = useSound(cardFlip, {
    volume: playSound ? 0.25 : 0,
  });

  const clickedCards = gameCards.filter((card) => card.isClicked);
  const shownCards = gameCards.filter((card) => card.isShown);

  useEffect(() => {
    gameStart();
  }, []);

  useEffect(() => {
    const checkIfTopLevelAchieved = (topLevel, level) => topLevel === level;
    if (checkIfTopLevelAchieved(topLevel, level)) {
      gameOver();
    }
  }, [level]);

  useEffect(() => {
    const checkIfAllCardsHaveBeenClicked = (clickedCards, shownCards) => {
      return (
        clickedCards.length > 0 &&
        shownCards.length > 0 &&
        clickedCards.length === shownCards.length
      );
    };
    if (checkIfAllCardsHaveBeenClicked(clickedCards, shownCards)) {
      console.log("Current game cards:");
      console.table(gameCards);
      nextLevel();
    }
  }, [clickedCards, gameCards]);

  const gameStart = () => {
    console.log("Game mode started!");
    dispatch(setNewGameCardAnimationAction());
    dispatch(resetDeck(gameCards, cardsAddedPerLevel));
    dispatch(resetLevel());
    dispatch(toggleShowLevelAction());
  };

  const nextLevel = () => {
    dispatch(increaseGameLevel());
    dispatch(toggleShowLevelAction());
    dispatch(showNewCards(gameCards, cardsAddedPerLevel));
    console.log(`Next level ${level}!`);
  };

  const gameOver = () => {
    dispatch(toggleShowOverlayAction());
    dispatch(toggleGameOver());
    dispatch(updateHighScore());
    dispatch(setGameResult());
    dispatch(resetLevel());
    console.log("Game over!");
  };

  const playCard = (cardId) => {
    const findCard = clickedCards.find((card) => card.id === cardId);
    if (!findCard) {
      const playCard = gameCards.map((card) =>
        card.id === cardId ? { ...card, isClicked: true } : card
      );
      dispatch(setClickCardAnimationAction(playFlipSound));
      setTimeout(
        // set cards in the middle of the animation
        () => dispatch(shuffleDeck(playCard)),
        cardAnimationDuration / 2
      );
    } else {
      gameOver();
    }
  };

  return (
    <motion.div
      className="inset-0 fixed flex-grow flex flex-col justify-center bg-game-mode bg-cover bg-center bg-no-repeat bg-black bg-opacity-30 bg-blend-overlay"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <Header />
      <div className="relative flex-grow grid justify-items-center items-center gap-5 grid-cols-cards-sm xl:grid-cols-cards-lg 3xl:grid-cols-cards-xl">
        {shownCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            name={card.name}
            playCard={() => playCard(card.id)}
          />
        ))}
        {showLevel && <Level />}
      </div>
      <Footer />
    </motion.div>
  );
}
