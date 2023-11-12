import "./GameModal.css";

const GameModal = ({ level, topLevel, shownLevel, callback }) => {
  return (
    <section className="game-modal-end">
      <div className="game-modal--content">
        <h1 className="game-modal--header">Game Over!</h1>

        {level === topLevel ? (
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
              {`You reached level ${shownLevel}!`}
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
