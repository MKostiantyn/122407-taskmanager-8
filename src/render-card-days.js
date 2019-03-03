import formatDayToName from './helpers/format-day-to-name';
export default (cardDays, cardIndex) => {
  if (cardDays.length && !isNaN(cardIndex)) {
    const templateDay = (indexDay, indexCard, arrayCardDays) => {
      const dayName = formatDayToName(indexDay);
      return `<input class="visually-hidden card__repeat-day-input"
              type="checkbox" id="repeat-${dayName}-${indexCard}" name="repeat"
              value="${dayName}" ${arrayCardDays[indexDay] ? `checked` : ``}>
              <label class="card__repeat-day" for="repeat-${dayName}-${indexCard}">${dayName}</label>`;
    };

    return cardDays.reduceRight((currentValue, item, index, array) => {
      if (!index) {
        return currentValue + templateDay(index, cardIndex, array);
      }
      return templateDay(index, cardIndex, array) + currentValue;
    }, ``);
  }
  return ``;
};
