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
