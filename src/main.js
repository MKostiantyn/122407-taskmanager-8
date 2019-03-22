import {getRandomInteger} from './helpers/get-random-integer';
import {renderTasks} from './render-tasks';
import {renderFilters} from './render-filters';
import {getTasksDataArray} from './get-tasks-data-array';
import {FILTERS_NAME_ARRAY_MOCK as filtersMap} from './get-mock-data';

const TASK_QUANTITY = 7;
const tasksDataArray = getTasksDataArray(TASK_QUANTITY);
const filtersSection = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

boardTasks.innerHTML = renderTasks(tasksDataArray);
filtersSection.innerHTML = renderFilters(filtersMap, tasksDataArray);

const filters = filtersSection.querySelectorAll(`.filter__input`);
if (filters.length) {
  filters.forEach((item) => {
    item.addEventListener(`change`, () => {
      const randomInteger = getRandomInteger(1, 6);
      const tasksData = getTasksDataArray(randomInteger);
      boardTasks.innerHTML = renderTasks(tasksData);
    });
  });
}
