export default (objectData) => {
  if (objectData instanceof Map && objectData.size) {
    const controlButtonClasses = (data, name) => `card__btn card__btn--${name.toLowerCase()} ${data.get(name) ? `` : `card__btn--disabled`}`;
    const templateControlButton = (data, name) => `<button type="button" class="${controlButtonClasses(data, name)}">${name}</button>`;

    return Array.from(objectData.keys()).reduce((currentValue, key) => currentValue + templateControlButton(objectData, key), ``);
  }
  return ``;
};
