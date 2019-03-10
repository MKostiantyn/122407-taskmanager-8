export default (cardColors, cardIndex) => {
  if (cardColors instanceof Map && cardColors.size) {
    const templateColorInputAndLabel = (data, color, index) => `<input  type="radio" id="color-${color}-${index}" 
                                                                        class="card__color-input card__color-input--${color} visually-hidden" 
                                                                        name="color" value="${color}" ${data.get(color) ? `checked` : ``}/>
                                                                      <label for="color-${color}-${index}"
                                                                        class="card__color card__color--${color}">${color}</label>`;

    const renderColorInputsAndLabels = (colors, index) => Array.from(colors.keys()).reduce((currentValue, key) => currentValue + templateColorInputAndLabel(cardColors, key, index), ``);

    return `<div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">${renderColorInputsAndLabels(cardColors, cardIndex)}</div>
          </div>`;
  }
  return ``;
};
