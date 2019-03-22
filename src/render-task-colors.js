import {COLOR_ARRAY_MOCK as colors} from './get-mock-data';

export const renderTaskColors = (color) => {
  const templateColorInputAndLabel = (currentColor, index, chosenColor) => {
    const inputId = `color-${currentColor}-${index}`;
    const inputClass = `card__color-input card__color-input--${currentColor} visually-hidden`;
    const inputAttribute = currentColor === chosenColor ? `checked` : ``;
    const labelClass = `card__color card__color--${currentColor}`;
    return `<input  type="radio" id="${inputId}" class="${inputClass}" name="color" value="${currentColor}" ${inputAttribute}/>
            <label for="${inputId}" class="${labelClass}">${currentColor}</label>`;
  };
  const renderColorInputsAndLabels = (colorsArray = [], colorName = ``) => colorsArray.reduce((accumulator, key, index) => accumulator + templateColorInputAndLabel(key, index, colorName), ``);

  return `<div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">${renderColorInputsAndLabels(colors, color)}</div>
          </div>`;
};
