import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flipCard: false,
  showOverlay: true,
  playMusic: true,
  playSound: true,
  cardAnimationDuration: 1000,
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
    }, 1000);
  };
};

export const setNewGameCardAnimationAction = (playFlipSound) => {
  console.log("Dispatching setNewGameCardAnimationAction action");
  return (dispatch) => {
    dispatch(toggleFlipCard(true));
    playFlipSound();
  };
};

export default displaySlice.reducer;
