import isRepeated from './check-card-repeated';
import isDueDate from './check-card-due-date';

export default (filtersData, cardsArray) => {
  if (filtersData && filtersData.size && cardsArray && cardsArray.length) {

    cardsArray.reduce((currentValue, item, index, array) => {
      if (!index) {
        filtersData.set(`All`, array.length);
      }
      if (isDueDate(item.dueDate)) {
        filtersData.set(`Overdue`, filtersData.get(`Overdue`) + 1);
      }
      if (!item.dueDate) {
        if (isRepeated(item.repeatDays)) {
          if (item.repeatDays[new Date().getDay()]) {
            filtersData.set(`Today`, filtersData.get(`Today`) + 1);
          }
        } else {
          filtersData.set(`Today`, filtersData.get(`Today`) + 1);
        }
      } else if (!isDueDate(item.dueDate)
        && new Date(item.dueDate).getDay() === new Date().getDay()) {
        filtersData.set(`Today`, filtersData.get(`Today`) + 1);
      }
      if (item.controlButtons) {
        if (item.controlButtons.get(`Favorites`)) {
          filtersData.set(`Favorites`, filtersData.get(`Favorites`) + 1);
        }
        if (item.controlButtons.get(`Archive`)) {
          filtersData.set(`Archive`, filtersData.get(`Archive`) + 1);
        }
      }
      if (item.hashTags && item.hashTags.size) {
        filtersData.set(`Tags`, filtersData.get(`Tags`) + 1);
      }
      if (isRepeated(item.repeatDays)) {
        filtersData.set(`Repeating`, filtersData.get(`Repeating`) + 1);
      }
    }, {});
  }
  return filtersData;
};
