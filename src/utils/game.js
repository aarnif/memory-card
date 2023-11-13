export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const setLevelAnimation = () => {
  const levelHeader = document.querySelector(".header--level");
  levelHeader.classList.add("active");
  setTimeout(() => {
    levelHeader.classList.remove("active");
  }, 1500);
};
