import isRepeated from './check-card-repeated';
import isOverDueDate from './check-card-overdue-date';
import isDoDateToday from './check-card-do-date-today';

export default (filtersData, cardsArray) => {
  if (filtersData && filtersData.size && cardsArray && cardsArray.length) {

    cardsArray.reduce((currentValue, item, index, array) => {
      if (!index) {
        filtersData.set(`All`, array.length);
      }
      if (isOverDueDate(item.dueDate)) {
        filtersData.set(`Overdue`, filtersData.get(`Overdue`) + 1);
      }
      if (isDoDateToday(item.dueDate, item.repeatDays)) {
        filtersData.set(`Today`, filtersData.get(`Today`) + 1);
      }
      if (item.isDone) {
        filtersData.set(`Archive`, filtersData.get(`Archive`) + 1);
      }
      if (item.isFavorite) {
        filtersData.set(`Favorites`, filtersData.get(`Favorites`) + 1);
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
