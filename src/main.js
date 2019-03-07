import getRandomInteger from './helpers/get-random-integer';
import renderCards from './render-cards';
import renderFilters from './render-filters';
import makeCardsArray from './make-cards-array';

const CARDS_QUANTITY = 7;
const FILTERS_NAME_ARRAY_MOCK = new Map([
  [`All`, 0],
  [`Overdue`, 0],
  [`Today`, 0],
  [`Favorites`, 0],
  [`Archive`, 0],
  [`Tags`, 0],
  [`Repeating`, 0]
]);
const cardsArray = makeCardsArray(CARDS_QUANTITY);
const filtersSection = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

boardTasks.innerHTML = renderCards(cardsArray);
filtersSection.innerHTML = renderFilters(FILTERS_NAME_ARRAY_MOCK, cardsArray);

const filters = filtersSection.querySelectorAll(`.filter__input`);
if (filters.length) {
  filters.forEach((item) => {
    item.addEventListener(`change`, () => {
      boardTasks.innerHTML = renderCards(makeCardsArray(getRandomInteger(1, 6)));
    });
  });
}
