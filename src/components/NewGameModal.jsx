import "./GameModal.css";

const NewGameModal = ({ callback }) => {
  return (
    <section className="game-modal">
      <div className="game-modal--content">
        <h1 className="game-modal--header">Welcome to Gotham City!</h1>
        <p className="game-modal--text">
          {"Click each character once to level up."}
          <br></br>
          {"Each level adds a new character."}
          <br></br>
          {"Ready to test your memory? Click 'Begin'!"}
        </p>
        <button className="game-modal--new-game-button" onClick={callback}>
          Begin
        </button>
      </div>
    </section>
  );
};

export default NewGameModal;
