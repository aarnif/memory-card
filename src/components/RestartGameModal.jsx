import "./GameModal.css";
import { useSelector, useDispatch } from "react-redux";
import { resetLevel, toggleGameOver } from "../reducers/game";
import { resetDeck } from "../reducers/cards";
import {
  toggleShowOverlayAction,
  setNewGameCardAnimationAction,
} from "../reducers/display";
import useSound from "use-sound";
import cardFlip from "../assets/sounds/card_flip.wav";

const GameModal = () => {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);

  const { level, gameEndResult, cardsAddedPerLevel, topLevel } = gameState;

  const dispatch = useDispatch();
  const [playFlipSound] = useSound(cardFlip, { volume: 0.25 });

  const clickRestartGame = () => {
    dispatch(toggleGameOver());
    dispatch(toggleShowOverlayAction());
    dispatch(setNewGameCardAnimationAction(playFlipSound));
    dispatch(resetDeck(gameCards, cardsAddedPerLevel));
    dispatch(resetLevel());
    console.log("Restart game!");
    console.log(`First level ${level}!`);
  };
  return (
    <section className="game-modal-end">
      <div className="game-modal--content">
        <h1 className="game-modal--header">Game Over!</h1>

        {gameEndResult === topLevel ? (
          <>
            <p className="game-modal--text">
              {"Congratulations!"}
              <br></br>
              {`You reached the end of the game!`}
            </p>
          </>
        ) : (
          <>
            <p className="game-modal--text">
              {`You reached level ${gameEndResult}!`}
              <br></br>
              {"Ready to try again?"}
            </p>
          </>
        )}
        <button
          className="game-modal--new-game-button"
          onClick={clickRestartGame}
        >
          New Game
        </button>
      </div>
    </section>
  );
};

export default GameModal;
