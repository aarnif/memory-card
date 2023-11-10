// Load all images dynamically from directory
export const loadImages = async () => {
  const importAll = import.meta.glob("../assets/card-images/*.png"); // must use literal as path
  const imgs = [];
  for (const path in importAll) {
    const img = await importAll[path]();
    imgs.push(img.default);
  }
  return imgs;
};
