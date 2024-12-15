import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { iniatilizeCards } from "./reducers/cards";
import GameStart from "./components/GameStart";
import RestartGameModal from "./components/RestartGameModal";
import { Cards } from "./components/Cards";
import { AnimatePresence } from "framer-motion";

function App() {
  const gameState = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const { isGameStart, isGameOver } = gameState;

  useEffect(() => {
    dispatch(iniatilizeCards());
  }, []);

  return (
    <main
      key="game-window"
      className="flex-grow flex justify-center items-center"
    >
      <AnimatePresence mode="wait">
        {!isGameStart ? <GameStart key="game-start" /> : <Cards key="cards" />}
        {isGameOver && <RestartGameModal />}
      </AnimatePresence>
    </main>
  );
}

export default App;
