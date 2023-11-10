// Load all images dynamically from directory
export const loadCardData = async () => {
  const importAll = import.meta.glob("../assets/card-images/*.png"); // must use literal as path
  let index = 0;
  const cards = [];

  for (const path in importAll) {
    const img = await importAll[path]();
    const card = {
      id: index,
      image: img.default,
      isClicked: false,
    };
    cards.push(card);
    ++index;
  }
  return cards;
};
