import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./reducers/cards";
import gameReducer from "./reducers/game";

const store = configureStore({
  reducer: { cards: cardsReducer, game: gameReducer },
});

export default store;
