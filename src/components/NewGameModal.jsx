import "./GameModal.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleGameStart, resetLevel } from "../reducers/game";
import { resetDeck } from "../reducers/cards";
import {
  toggleShowOverlayAction,
  setNewGameCardAnimationAction,
} from "../reducers/display";
import useSound from "use-sound";
import cardFlip from "../assets/sounds/card_flip.wav";

const NewGameModal = () => {
  const gameCards = useSelector((state) => state.cards);
  const gameState = useSelector((state) => state.game);
  const displayState = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const { level, cardsAddedPerLevel } = gameState;
  const { playSound } = displayState;

  const [playFlipSound] = useSound(cardFlip, {
    volume: playSound ? 0.25 : 0,
  });

  const clickNewGame = () => {
    dispatch(toggleGameStart());
    dispatch(toggleShowOverlayAction());
    dispatch(setNewGameCardAnimationAction(playFlipSound));
    dispatch(resetDeck(gameCards, cardsAddedPerLevel));
    dispatch(resetLevel());
    console.log("New game started!");
    console.log(`First level ${level}!`);
  };

  return (
    <section className="game-modal-start">
      <div className="game-modal--content">
        <h1 className="game-modal--header">Welcome to Gotham City!</h1>
        <p className="game-modal--text">
          {"Click each character once to level up."}
          <br></br>
          {"Each level adds two new characters."}
          <br></br>
          {"Ready to test your memory? Click 'Begin'!"}
        </p>
        <button className="game-modal--new-game-button" onClick={clickNewGame}>
          Begin
        </button>
      </div>
    </section>
  );
};

export default NewGameModal;
