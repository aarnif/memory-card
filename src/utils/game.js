export const shuffleArray = (array) => {
  const shuffledArray = [...array];

  if (shuffledArray.length <= 1) return shuffledArray;

  if (shuffledArray.length === 2) return [shuffledArray[1], shuffledArray[0]];

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const resetClickedCards = (cards) => {
  return cards.map((card) => ({ ...card, isClicked: false }));
};

export const resetShownCards = (cards) => {
  return cards.map((card) => ({ ...card, isShown: false }));
};

export const checkIfAllCardsHaveBeenClicked = (clickedCards, shownCards) => {
  return clickedCards.length === shownCards.length;
};

export const checkIfTopLevelAchieved = (topLevel, level) => topLevel === level;

export const addNewCards = (cards, cardsAddedPerLevel) => {
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

export const addNewLevelToCards = (cards, cardsAddedPerLevel) => {
  const shuffleCards = shuffleArray(cards);
  const resetClickCards = resetClickedCards(shuffleCards);
  return addNewCards(resetClickCards, cardsAddedPerLevel);
};

export const resetCards = (cards, cardsAddedPerLevel) => {
  const resetShowCards = resetShownCards(cards);
  const shuffleCards = shuffleArray(resetShowCards);
  const resetClickCards = resetClickedCards(shuffleCards);
  return addNewCards(resetClickCards, cardsAddedPerLevel);
};
