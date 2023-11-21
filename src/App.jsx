import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { iniatilizeCards } from "./reducers/cards";
import "./App.css";
import NewGameModal from "./components/NewGameModal";
import RestartGameModal from "./components/RestartGameModal";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";
import { Overlay } from "./components/Overlay";

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
        <main className="main-content-modal">
          <NewGameModal />
        </main>
      ) : isGameOver ? (
        <main className="main-content-modal">
          <RestartGameModal />
        </main>
      ) : (
        <Cards />
      )}
      <Footer />
      <Overlay />
    </>
  );
}

export default App;
