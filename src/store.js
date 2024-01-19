import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./reducers/cards";
import gameReducer from "./reducers/game";
import displayReducer from "./reducers/display";

const store = configureStore({
  reducer: { cards: cardsReducer, game: gameReducer, display: displayReducer },
});

export default store;
