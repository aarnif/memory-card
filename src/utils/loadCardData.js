const characterNames = [
  "Alfred Pennyworth",
  "Bane",
  "Batman",
  "Batgirl",
  "Carmine Falcone",
  "Catwoman",
  "Harley Quinn",
  "James Gordon",
  "Joker",
  "Nightwing",
  "Poison Ivy",
  "Ra's al Ghul",
  "Riddler",
  "Robin",
  "Scarecrow",
  "Talia al Ghul",
];

// Load all images dynamically from directory
export const loadCardData = async () => {
  const importAll = import.meta.glob("../assets/card-images/*.png"); // must use literal as path
  console.log(importAll);
  let index = 0;
  const cards = [];

  for (const path in importAll) {
    const img = await importAll[path]();
    const card = {
      id: index,
      name: characterNames[index],
      image: img.default,
      isClicked: false,
    };
    cards.push(card);
    ++index;
  }
  return cards;
};
