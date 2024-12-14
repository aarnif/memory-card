import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { iniatilizeCards } from "./reducers/cards";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const gameState = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const { isGameStart, isGameOver } = gameState;

  useEffect(() => {
    dispatch(iniatilizeCards());
  }, []);

  return (
    <>
      <Header />
      <main
        key="game-window"
        className="flex-grow flex justify-center items-center"
      >
        <AnimatePresence>
          {!isGameStart ? (
            <NewGameModal key="new-game" />
          ) : (
            <Cards key="cards" />
          )}
          {isGameOver && <RestartGameModal />}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
