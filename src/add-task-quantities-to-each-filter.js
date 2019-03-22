import {isRepeated} from './check-task-repeated';
import {isOverDueDate} from './check-task-overdue-date';
import {isDoDateToday} from './check-task-do-date-today';

export const addTaskQuantitiesToEachFilter = (filtersData, tasks = []) => {
  if (filtersData && filtersData.size && Array.isArray(tasks)) {

    tasks.reduce((currentValue, item, index, array) => {
      if (!index) {
        filtersData.set(`All`, array.length);
      }
      if (isOverDueDate(item.dueDate)) {
        filtersData.set(`Overdue`, filtersData.get(`Overdue`) + 1);
      }
      if (isDoDateToday(item.dueDate, item.repeatingDays)) {
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
      if (isRepeated(item.repeatingDays)) {
        filtersData.set(`Repeating`, filtersData.get(`Repeating`) + 1);
      }
    }, {});
  }
  return filtersData;
};
