export default (mapObject) => {
  let chosenColor = ``;
  if (mapObject && mapObject.size) {
    mapObject.forEach((value, key) => {
      value ? chosenColor = key : chosenColor;
    });
  }
  return chosenColor;
};
