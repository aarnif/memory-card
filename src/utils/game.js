export const checkIfAllCardsHaveBeenClicked = (clickedCards, shownCards) => {
  return (
    clickedCards.length > 0 &&
    shownCards.length > 0 &&
    clickedCards.length === shownCards.length
  );
};

export const checkIfTopLevelAchieved = (topLevel, level) => topLevel === level;
