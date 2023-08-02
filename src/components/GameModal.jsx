import "./GameModal.css";

const GameModal = ({ textContent, callback }) => {
  return (
    <section className="new-game-modal">
      <div className="new-game-modal--content">{textContent}</div>
      <button className="new-game-modal--new-game-button" onClick={callback}>
        New Game
      </button>
    </section>
  );
};

export default GameModal;
