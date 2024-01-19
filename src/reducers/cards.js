import { createSlice } from "@reduxjs/toolkit";
import { characters } from "../characterData";

const resetShownCards = (cards) => {
  return cards.map((card) => ({ ...card, isShown: false }));
};

const resetClickedCards = (cards) => {
  return cards.map((card) => ({ ...card, isClicked: false }));
};

const addNewCards = (cards, cardsAddedPerLevel) => {
  let count = 0;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (!card.isShown) {
      card.isShown = true;
      console.log("Add new card:");
      console.log(card);
      ++count;
    }

    if (count === cardsAddedPerLevel) {
      break;
    }
  }
  return cards;
};

const shuffleArray = (array) => {
  const shuffledArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const cardsSlice = createSlice({
  name: "cards",
  initialState: [],
  reducers: {
    setCards(state, action) {
      const cards = action.payload;
      return cards;
    },
    showCards(state, action) {
      const cards = action.payload.cards;
      const shuffledCards = shuffleArray(cards);
      const resetClickCards = resetClickedCards(shuffledCards);
      return addNewCards(resetClickCards, action.payload.howMany);
    },
    reset(state, action) {
      const cards = action.payload.cards;
      const resetShowCards = resetShownCards(cards);
      const shuffledCards = shuffleArray(resetShowCards);
      const resetClickCards = resetClickedCards(shuffledCards);
      return addNewCards(resetClickCards, action.payload.howMany);
    },
    shuffleCards(state, action) {
      console.log(action.payload);
      const cards = action.payload;
      return shuffleArray(cards);
    },
  },
});

export const { setCards, showCards, reset, shuffleCards } = cardsSlice.actions;

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
    dispatch(shuffleCards(cards));
  };
};

export default cardsSlice.reducer;
