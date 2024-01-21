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
import clickButton from "../assets/sounds/new_game_click.mp3";

const GameModal = () => {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, gameEndResult, cardsAddedPerLevel, topLevel } = gameState;
  const { playSound } = displayState;

  const [playFlipSound] = useSound(cardFlip, {
    volume: playSound ? 0.25 : 0,
  });

  const [playClickSound] = useSound(clickButton, {
    volume: 0.25,
  });

  const clickRestartGame = () => {
    playClickSound();

    setTimeout(() => {
      dispatch(toggleGameOver());
      dispatch(toggleShowOverlayAction());
      dispatch(setNewGameCardAnimationAction(playFlipSound));
      dispatch(resetDeck(gameCards, cardsAddedPerLevel));
      dispatch(resetLevel());
    }, 100);

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
