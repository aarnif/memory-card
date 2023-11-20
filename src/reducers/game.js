import { createSlice } from "@reduxjs/toolkit";
import { characters } from "../utils/characterData";

const cardsAddedPerLevel = 2;

const initialState = {
  isGameStart: false,
  isGameOver: false,
  level: null,
  gameEndResult: null,
  highScore: null,
  cardsAddedPerLevel: cardsAddedPerLevel,
  topLevel: characters.length / cardsAddedPerLevel,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameStart(state, action) {
      state.isGameStart = !state.isGameStart;
    },
    setGameOver(state, action) {
      state.isGameOver = !state.isGameOver;
    },
    increaseLevel(state, action) {
      state.level = state.level + 1;
    },
    setLeveltoNull(state, action) {
      state.level = null;
    },
    resetLevel(state, action) {
      console.log("action payload:", action.payload);
      state.level = 1;
    },
    setGameEndResult(state, action) {
      state.gameEndResult = state.level;
    },
    setHighScore(state, action) {
      state.highScore =
        state.level > state.highScore ? state.level : state.highScore;
    },
  },
});

export const {
  setGameStart,
  setGameOver,
  increaseLevel,
  setLeveltoNull,
  resetLevel,
  setGameEndResult,
  setHighScore,
} = gameSlice.actions;

export const toggleGameStart = () => {
  console.log("Dispatching toggleGameStart action");
  return (dispatch) => {
    dispatch(setGameStart());
  };
};

export const toggleGameOver = () => {
  console.log("Dispatching toggleGameOver action");
  return (dispatch) => {
    dispatch(setGameOver());
  };
};

export const increaseGameLevel = () => {
  console.log("Dispatching setGameLevel action");
  return (dispatch) => {
    dispatch(increaseLevel());
  };
};

export const setGameLeveltoNull = () => {
  console.log("Dispatching setGameLeveltoNull action");
  return (dispatch) => {
    dispatch(setLeveltoNull());
  };
};

export const setGameResult = () => {
  console.log("Dispatching setGameResult action");
  return (dispatch) => {
    dispatch(setGameEndResult());
  };
};

export const updateHighScore = () => {
  console.log("Dispatching updateHighScore action");
  return (dispatch) => {
    dispatch(setHighScore());
  };
};

export default gameSlice.reducer;
