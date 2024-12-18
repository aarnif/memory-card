import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flipCard: false,
  showOverlay: true,
  showLevel: false,
  playMusic: true,
  playSound: true,
  cardAnimationDuration: 1000,
  levelAnimationDuration: 2000,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    toggleFlipCard(state, action) {
      state.flipCard = action.payload;
    },
    toggleShowOverlay(state, action) {
      state.showOverlay = !state.showOverlay;
    },
    toggleShowLevel(state, action) {
      state.showLevel = action.payload;
    },
    togglePlayMusic(state, action) {
      state.playMusic = !state.playMusic;
    },
    togglePlaySound(state, action) {
      state.playSound = !state.playSound;
    },
  },
});

export const {
  toggleFlipCard,
  toggleShowOverlay,
  toggleShowLevel,
  togglePlayMusic,
  togglePlaySound,
  showCardAnimation,
} = displaySlice.actions;

export const toggleFlipCardAction = (setFlipCard) => {
  console.log("Dispatching toggleFlipCard action");
  return (dispatch) => {
    dispatch(toggleFlipCard(setFlipCard));
  };
};

export const toggleShowOverlayAction = () => {
  console.log("Dispatching toggleShowOverlay action");
  return (dispatch) => {
    dispatch(toggleShowOverlay());
  };
};

export const toggleShowLevelAction = () => {
  console.log("Dispatching toggleShowLevel action");
  return (dispatch) => {
    dispatch(toggleShowLevel(true));
    setTimeout(() => {
      dispatch(toggleShowLevel(false));
    }, initialState.levelAnimationDuration);
  };
};

export const togglePlayMusicAction = () => {
  console.log("Dispatching togglePlayMusic action");
  return (dispatch) => {
    dispatch(togglePlayMusic());
  };
};

export const togglePlaySoundAction = () => {
  console.log("Dispatching togglePlaySound action");
  return (dispatch) => {
    dispatch(togglePlaySound());
  };
};

export const setClickCardAnimationAction = (playFlipSound) => {
  console.log("Dispatching setClickCardAnimationAction action");
  return (dispatch) => {
    dispatch(toggleFlipCard(false));
    playFlipSound();
    setTimeout(() => {
      dispatch(toggleFlipCard(true));
      playFlipSound();
    }, initialState.cardAnimationDuration);
  };
};

export const setNewGameCardAnimationAction = () => {
  console.log("Dispatching setNewGameCardAnimationAction action");
  return (dispatch) => {
    dispatch(toggleFlipCard(true));
  };
};

export default displaySlice.reducer;
