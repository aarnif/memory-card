import "./GameModal.css";

const GameModal = ({ gameEndResult, topLevel, callback }) => {
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
        <button className="game-modal--new-game-button" onClick={callback}>
          New Game
        </button>
      </div>
    </section>
  );
};

export default GameModal;
