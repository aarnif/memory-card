import { createSlice } from "@reduxjs/toolkit";
import { characters } from "../utils/characterData";
import { shuffleArray, addNewLevelToCards, resetCards } from "../utils/game";

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
    shuffle(state, action) {
      return shuffleArray(action.payload);
    },
  },
});

export const { setCards, showCards, reset, shuffle } = cardsSlice.actions;

export const iniatilizeCards = () => {
  console.log("Dispatching iniatilizeCards action");
  return (dispatch) => {
    dispatch(setCards(characters));
  };
};

export const showNewCards = (cards, howMany) => {
  console.log("Dispatching showNewCards action");
  return (dispatch) => {
    dispatch(showCards({ cards, howMany }));
  };
};

export const resetDeck = (cards, howMany) => {
  console.log("Dispatching resetDeck action");
  return (dispatch) => {
    dispatch(reset({ cards, howMany }));
  };
};

export const shuffleDeck = (cards) => {
  console.log("Dispatching shuffleDeck action");
  return (dispatch) => {
    dispatch(shuffle(cards));
  };
};

export default cardsSlice.reducer;
