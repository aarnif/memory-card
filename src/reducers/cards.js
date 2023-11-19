import { createSlice } from "@reduxjs/toolkit";
import { characters } from "../utils/characterData";
import { addNewLevelToCards, resetCards } from "../utils/game";

const cardsSlice = createSlice({
  name: "cards",
  initialState: [],
  reducers: {
    setCards(state, action) {
      return action.payload;
    },
    showCards(state, action) {
      return addNewLevelToCards(action.payload.cards, action.payload.howMany);
    },
    reset(state, action) {
      return resetCards(action.payload.cards, action.payload.howMany);
    },
  },
});

export const { setCards, showCards, reset } = cardsSlice.actions;

export const iniatilizeCards = () => {
  console.log("Dispatching iniatilizeCards action");
  return async (dispatch) => {
    dispatch(setCards(characters));
  };
};

export const showNewCards = (cards, howMany) => {
  console.log("Dispatching showNewCards action");
  return async (dispatch) => {
    dispatch(showCards({ cards, howMany }));
  };
};

export const resetDeck = (cards, howMany) => {
  console.log("Dispatching resetDeck action");
  return async (dispatch) => {
    dispatch(reset({ cards, howMany }));
  };
};

export default cardsSlice.reducer;
