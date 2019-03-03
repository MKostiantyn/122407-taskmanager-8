import addCardQuantitiesToEachFilter from './add-car-quantities-to-each-filter'
export default (filtersData, cardsArray) => {
  const getFilterTemplate = (name, data, index) => `<input type="radio" id="filter__${name.toLowerCase()}"
                                                    class="filter__input visually-hidden"
                                                    name="filter" ${!index ? `checked` : ``} ${data.get(name) ? `` : `disabled`} />
                                                    <label for="filter__${name.toLowerCase()}" class="filter__label">${name.toUpperCase()}
                                                    <span class="filter__${name.toLowerCase()}-count">${data.get(name)}</span></label>`;
  filtersData = addCardQuantitiesToEachFilter(filtersData, cardsArray);
  return Array.from(filtersData.keys()).reduce((currentValue, key, index) => currentValue + getFilterTemplate(key, filtersData, index), ``);
};
