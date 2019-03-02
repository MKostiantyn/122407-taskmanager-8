'use strict';
const FILTERS_NAME_ARRAY_MOCK = new Map([
  [`All`, 0],
  [`Overdue`, 0],
  [`Today`, 0],
  [`Favorites`, 0],
  [`Archive`, 0],
  [`Tags`, 0],
  [`Repeating`, 0]
]);
const CARD_COLORS_ARRAY_MOCK = [`black`, `yellow`, `blue`, `green`, `pink`];
const CARD_IMAGES_ARRAY = [`img/add-photo.svg`, `img/sample-img.jpg`];
const filtersSection = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const getRandomDate = () => Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getCardData = () => {
  return {
    dueDate: getRandomInteger(0, 1) ? getRandomDate() : false,
    colorClassName: CARD_COLORS_ARRAY_MOCK[getRandomInteger(0, 4)],
    text: [
      `This is example of new task, you can add picture, set date and time, add tags.`,
      `It is example of repeating task. It marks by wave.`,
      `Here is a card with filled data`,
      ``
    ][getRandomInteger(0, 3)],
    hashTags: new Set([`repeat`, `cinema`, `entertaiment`].slice(0, getRandomInteger(0, 3))),
    repeatDays: new Map([
      [`mo`, Boolean(getRandomInteger(0, 1))],
      [`tu`, Boolean(getRandomInteger(0, 1))],
      [`we`, Boolean(getRandomInteger(0, 1))],
      [`th`, Boolean(getRandomInteger(0, 1))],
      [`fr`, Boolean(getRandomInteger(0, 1))],
      [`sa`, Boolean(getRandomInteger(0, 1))],
      [`su`, Boolean(getRandomInteger(0, 1))]
    ]),
    image: {
      src: CARD_IMAGES_ARRAY[getRandomInteger(0, 1)],
      alt: `task picture`
    },
    controlButtons: new Map([
      [`Edit`, true],
      [`Archive`, Boolean(getRandomInteger(0, 1))],
      [`Favorites`, Boolean(getRandomInteger(0, 1))]
    ])
  };
};

const renderFilters = (filtersData) => {
  const getFilterTemplate = (name, data, index) => `<input type="radio" id="filter__${name.toLowerCase()}"
                                                    class="filter__input visually-hidden"
                                                    name="filter" ${!index ? `checked` : ``} ${data.get(name) ? `` : `disabled`} />
                                                    <label for="filter__${name.toLowerCase()}" class="filter__label">${name.toUpperCase()}
                                                    <span class="filter__${name.toLowerCase()}-count">${data.get(name)}</span></label>`;
  return Array.from(filtersData.keys()).reduce((currentValue, key, index) => currentValue + getFilterTemplate(key, filtersData, index), ``);
};

const renderControlButtons = (objectData, filters) => {
  if (objectData instanceof Map && objectData.size) {
    const controlButtonClasses = (data, name) => `card__btn card__btn--${name.toLowerCase()} ${data.get(name) ? `` : `card__btn--disabled`}`;
    const templateControlButton = (data, name) => `<button type="button" class="${controlButtonClasses(data, name)}">${name}</button>`;

    return Array.from(objectData.keys()).reduce((currentValue, key) => {
      if (filters.has(key) && objectData.get(key)) {
        filters.set(key, filters.get(key) + 1);
      }
      return currentValue + templateControlButton(objectData, key);
    }, ``);
  }
  return ``;
};

const renderCardDeadlineDay = (milliseconds) => {
  const dayObject = new Date(milliseconds);
  const hours = dayObject.getHours();
  const month = dayObject.toLocaleString(`en-us`, {month: `long`});
  const date = `${dayObject.getDate()} ${month}`;
  const time = `${hours % 12 ? hours % 12 : 12}:${dayObject.getMinutes()} ${hours >= 12 ? `PM` : `AM`}`;
  return `<label class="card__input-deadline-wrap"><input class="card__date" type="text" placeholder="${date}" name="date" value="${date}"></label>
          <label class="card__input-deadline-wrap"><input class="card__time" type="text" placeholder="${time}" name="time" value="${time}"></label>`;
};

const checkIsRepeated = (repeatedDays) => {
  if (repeatedDays instanceof Map && repeatedDays.size) {
    return Array
      .from(repeatedDays.values())
      .some((item) => item);
  }
  return false;
};

const renderCardDays = (cardDays, cardIndex) => {
  const templateDay = (day, index, repeatDays) => `<input class="visually-hidden card__repeat-day-input"
                                                      type="checkbox" id="repeat-${day}-${index}"
                                                      name="repeat"
                                                      value="${day}"
                                                      ${repeatDays.get(day) ? `checked` : ``}>
                                                    <label class="card__repeat-day"
                                                      for="repeat-${day}-${index}">${day}</label>`;

  return Array.from(cardDays.keys()).reduce((currentValue, key) => currentValue + templateDay(key, cardIndex, cardDays), ``);
};

const renderCardHashTags = (dateSet, filters) => {
  const hashTagTemplate = (name) => `<span class="card__hashtag-inner">
                                      <input type="hidden" name="hashtag" value="${name}" class="card__hashtag-hidden-input">
                                      <button type="button" class="card__hashtag-name">#${name}</button>
                                      <button type="button" class="card__hashtag-delete">delete</button>
                                    </span>`;
  filters.set(`Tags`, filters.get(`Tags`) + 1);

  return Array
    .from(dateSet.values())
    .reduce((currentValue, element) => currentValue + hashTagTemplate(element), ``);
};

const renderCardColors = (cardColors, cardIndex, cardCurrentColor) => {
  const templateColorInputAndLabel = (color, index, currentColor) => `<input  type="radio" id="color-${color}-${index}" 
                                                                        class="card__color-input card__color-input--${color} visually-hidden" 
                                                                        name="color" 
                                                                        value="${color}"
                                                                        ${currentColor === color ? `checked` : ``} />
                                                                      <label for="color-${color}-${index}"
                                                                        class="card__color card__color--${color}">${color}</label>`;

  const renderColorInputsAndLabels = (colors, index, currentColor) => colors.reduce((currentValue, element) => currentValue + templateColorInputAndLabel(element, index, currentColor), ``);

  return `<div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">${renderColorInputsAndLabels(cardColors, cardIndex, cardCurrentColor)}</div>
          </div>`;
};

const getCardClasses = (data, isDueDate, filters) => {
  const isRepeated = (mapObject) => mapObject && mapObject.size && Array.from(mapObject.values()).some((element) => element);
  if (isRepeated(data.repeatDays)) {
    filters.set(`Repeating`, filters.get(`Repeating`) + 1);
  }
  if (isDueDate) {
    filters.set(`Overdue`, filters.get(`Overdue`) + 1);
  }
  return `card ${data.colorClassName ? `card--${data.colorClassName}` : ``}
    ${isRepeated(data.repeatDays) ? `card--repeat` : ``}
    ${isDueDate ? `card--deadline` : ``}`;
};

const renderCard = (data, index, filters) => {
  if (data && Object.keys(data).length) {
    const dateNow = Date.now();
    const isDueDate = data.dueDate ? dateNow > data.dueDate : data.dueDate;
    const isToday = dateNow === data.dueDate;
    if (isToday) {
      filters.set(`Today`, filters.get(`Today`) + 1);
    }
    return `<article class="${getCardClasses(data, isDueDate, filters)}">
              <form class="card__form" method="get">
                <div class="card__inner">
                  <div class="card__control">${renderControlButtons(data.controlButtons, filters)}</div>
                  <div class="card__color-bar"><svg class="card__color-bar-wave" width="100%" height="10"><use xlink:href="#wave"></use></svg></div>
                  <div class="card__textarea-wrap">
                      <label>
                          <textarea class="card__text" placeholder="Start typing your text here..." name="text">${data.text ? data.text : ``}</textarea>
                      </label>
                  </div>
                  <div class="card__settings">
                      <div class="card__details">
                          <div class="card__dates">
                              <button class="card__date-deadline-toggle" type="button">date: <span class="card__date-status">${data.dueDate ? `yes` : `no`}</span></button>
                              <fieldset class="card__date-deadline" ${!data.dueDate ? `disabled` : ``}>${data.dueDate ? renderCardDeadlineDay(data.dueDate) : ``}</fieldset>
                              <button class="card__repeat-toggle" type="button">repeat:<span class="card__repeat-status">${data.repeatDays && checkIsRepeated(data.repeatDays) ? `yes` : `no`}</span></button>
                              <fieldset class="card__repeat-days"${!data.repeatDays || !checkIsRepeated(data.repeatDays) ? ` disabled` : ``}>
                                  <div class="card__repeat-days-inner">${data.repeatDays ? renderCardDays(data.repeatDays, index) : ``}</div>
                              </fieldset>
                          </div>
                          <div class="card__hashtag">
                              <div class="card__hashtag-list">${data.hashTags && data.hashTags.size ? renderCardHashTags(data.hashTags, filters) : ``}</div>
                              <label><input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"></label>
                          </div>
                      </div>
                      <label class="card__img-wrap">
                          <input type="file" class="card__img-input visually-hidden" name="img">
                          <img ${data.image ? `src="${data.image.src}" alt="${data.image.alt}"` : ``} class="card__img">
                      </label>
                      ${renderCardColors(CARD_COLORS_ARRAY_MOCK, index, data.colorClassName)}
                  </div>
                  <div class="card__status-btns">
                      <button class="card__save" type="submit">save</button>
                      <button class="card__delete" type="button">delete</button>
                  </div>
                </div>
              </form>
            </article>`;
  }
  return ``;
};

const renderCards = (quantityCards, filters) => {
  filters.set(`All`, quantityCards);
  return [...new Array(quantityCards)].map((element, index) => renderCard(getCardData(), index, filters)).join(``);
};

boardTasks.innerHTML = renderCards(7, FILTERS_NAME_ARRAY_MOCK);
filtersSection.innerHTML = renderFilters(FILTERS_NAME_ARRAY_MOCK);

const filters = filtersSection.querySelectorAll(`.filter__input`);
if (filters.length) {
  filters.forEach((item) => {
    item.addEventListener(`change`, () => {
      boardTasks.innerHTML = renderCards(getRandomInteger(1, 6), FILTERS_NAME_ARRAY_MOCK);
    });
  });
}
