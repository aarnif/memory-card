import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { iniatilizeCards } from "./reducers/cards";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";
import { Overlay } from "./components/Overlay";
import { Level } from "./components/Level";

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
      {!isGameStart ? (
        <main className="flex grow justify-center items-center">
          <NewGameModal />
        </main>
      ) : isGameOver ? (
        <main className="flex grow justify-center items-center">
          <RestartGameModal />
        </main>
      ) : (
        <Cards />
      )}
      <Footer />
      <Overlay />
      <Level />
    </>
  );
}

export default App;
