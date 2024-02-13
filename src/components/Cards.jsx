import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import { showNewCards, shuffleDeck } from "../reducers/cards";
import {
  toggleGameOver,
  increaseGameLevel,
  setGameLeveltoNull,
  setGameResult,
  updateHighScore,
} from "../reducers/game";
import {
  toggleShowOverlayAction,
  setClickCardAnimationAction,
} from "../reducers/display";
import cardFlip from "../assets/sounds/card_flip.wav";
import { Card } from "./Card";

export function Cards() {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, cardsAddedPerLevel, topLevel } = gameState;
  const { playSound, cardAnimationDuration } = displayState;

  const [playFlipSound] = useSound(cardFlip, {
    volume: playSound ? 0.25 : 0,
  });

  const clickedCards = gameCards.filter((card) => card.isClicked);
  const shownCards = gameCards.filter((card) => card.isShown);

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

  const nextLevel = () => {
    dispatch(increaseGameLevel());
    dispatch(showNewCards(gameCards, cardsAddedPerLevel));
    console.log(`Next level ${level}!`);
  };

  const gameOver = () => {
    dispatch(toggleShowOverlayAction());
    dispatch(toggleGameOver());
    dispatch(updateHighScore());
    dispatch(setGameResult());
    dispatch(setGameLeveltoNull());
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

  const styles = {
    wrapper: "flex flex-col grow justify-center items-center p-10",
    cardGrid:
      "w-full h-full grid justify-items-center gap-5 grid-cols-cards-sm xl:grid-cols-cards-lg 3xl:grid-cols-cards-xl",
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.cardGrid}>
        {shownCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            name={card.name}
            playCard={() => playCard(card.id)}
          />
        ))}
      </div>
    </main>
  );
}
