const filtersSection = document.querySelector('.main__filter');
const boardTasks = document.querySelector('.board__tasks');

const FILTERS_DATA_ARRAY = [
    {
        name: `All`,
        qty: 15,
        checked: true
    },
    {
        name: `Overdue`,
        qty: 0
    },
    {
        name: `Today`,
        qty: 0
    },
    {
        name: `Favorites`,
        qty: 7
    },
    {
        name: `Repeating`,
        qty: 2
    },
    {
        name: `Tags`,
        qty: 6
    },
    {
        name: `Archive`,
        qty: 115
    }
];

const ADD_PHOTO_URL = `img/add-photo.svg`;
const ADD_PHOTO_ALT = `task picture`;
const CARDS_DATA_ARRAY = [
    {
        edit: true,
        color: `black`,
        text: `This is example of new task, you can add picture, set date and time, add tags.`,
    },
    {
        color: `pink`,
        text: `It is example of repeating task. It marks by wave.`,
        repeat: true,
        hashTags: [`repeat`, `cinema`, `entertaiment`],
    },
    {
        color: `yellow`,
        text: `This is card with missing deadline`,
        deadline: true,
        hashTags: [`repeat`, `cinema`, `entertaiment`]
    },
    {
        edit: true,
        color: `yellow`,
        text: `Here is a card with filled data`,
        repeat: true,
        hashTags: [`repeat`, `cinema`, `entertaiment`],
        dateDeadline: true,
        repeatDays: [`tu`, `fr`, `su`],
        image: {
            src: `img/sample-img.jpg`,
            alt: `task picture`
        }
    },
    {
        color: `blue`,
        hashTags: [`repeat`, `cinema`, `entertaiment`],
    },
    {
        color: `blue`,
        dateDeadline: true,
        hashTags: [`repeat`, `cinema`, `entertaiment`],
        image: {
            src: `img/sample-img.jpg`,
            alt: `task picture`
        }
    },
];
const CARD_COLORS_ARRAY = [`black`, `yellow`, `blue`, `green`, `pink`];
const CARD_DAYS_ARRAY = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const CARD_CONTROL_BUTTONS_ARRAY = [{name: `edit`}, {name: `archive`}, {name: `favorites`, disabled: true}];

const renderFilters = (filtersData) => {
    const renderFilter = (name, qty, status = false) => {
        return `<input type="radio"
            id="filter__${name.toLowerCase()}"
            class="filter__input visually-hidden"
            name="filter"
            ${qty && status ? `checked` : ``}
            ${!qty ? `disabled` : ``} />
            <label for="filter__${name.toLowerCase()}"
               class="filter__label">${name.toUpperCase()}
               <span class="filter__${name.toLowerCase()}-count">${qty}</span></label>`;
    };

    return filtersData.reduce((curVal, el) => {
        return curVal + renderFilter(el.name, el.qty, el.checked)
    }, ``);
};

const renderControlButtons = (cardButtons) => {
    const templateControlButton = (data) => {
        return `<button type="button" class="card__btn card__btn--${data.name}${data.disabled ? ` card__btn--disabled` : ``}">${data.name}</button>`
    };

    return cardButtons.reduce((curVal, el) => {
        return curVal + templateControlButton(el);
    }, ``)
};

const renderCardColors = (cardColors, index, currentColor) => {
    const templateColorInputAndLabel = (color, index, currentColor) => {
        return `<input  type="radio"
                        id="color-${color}-${index}" 
                        class="card__color-input card__color-input--${color} visually-hidden" 
                        name="color" 
                        value="${color}"
                        ${currentColor === color ? `checked` : ``} />
                      <label for="color-${color}-${index}" class="card__color card__color--${color}">${color}</label>`
    };

    const renderColorInputsAndLabels = (colors, index, currentColor) => {
        return colors.reduce(function (curVal, el) {
            return curVal + templateColorInputAndLabel(el, index, currentColor);
        }, ``);
    };

    return `<div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">${renderColorInputsAndLabels(cardColors, index, currentColor)}</div>
            </div>`;
};

const renderCardDays = (cardDays, index, repeatDays) => {
    const templateDay = (day, index, repeatDays) => {
        return `<input class="visually-hidden card__repeat-day-input"
                        type="checkbox" id="repeat-${day}-${index}"
                        name="repeat"
                        value="${day}"
                        ${repeatDays && ~repeatDays.indexOf(day) ? `checked` : ``}>
                <label class="card__repeat-day" for="repeat-${day}-${index}">${day}</label>`
    };

    return cardDays.reduce(function (curVal, el) {
        return curVal + templateDay(el, index, repeatDays);
    }, ``);
};

const renderHashTags = (array) => {
    const hashTagTemplate = (name) => {
        return `<span class="card__hashtag-inner">
                    <input type="hidden" name="hashtag" value="${name}" class="card__hashtag-hidden-input">
                    <button type="button" class="card__hashtag-name">#${name}</button>
                    <button type="button" class="card__hashtag-delete">delete</button>
                </span>`
    };

    return array.reduce((curVal, el) => {
        return curVal + hashTagTemplate(el);
    }, ``)
};

const renderCards = (cardsData) => {
    //edit, color, text, repeat, deadline, hashtag, dateDeadline, repeatDays, image
    const renderCard = (obj, index) => {
        return `<article class="card${obj.color ? ` card--${obj.color}` : ``}${obj.edit ? ` card--edit` : ``}${obj.repeat ? ` card--repeat` : ``}${obj.deadline ? ` card--deadline` : ``}">
                    <form class="card__form" method="get">
                        <div class="card__inner">
                            <div class="card__control">${renderControlButtons(CARD_CONTROL_BUTTONS_ARRAY)}</div>
                            <div class="card__color-bar"><svg class="card__color-bar-wave" width="100%" height="10"><use xlink:href="#wave"></use></svg></div>
                            <div class="card__textarea-wrap">
                                <label>
                                    <textarea class="card__text"
                                            placeholder="Start typing your text here..."
                                            name="text">${obj.text ? obj.text : ``}</textarea>
                                </label>
                            </div>
                            <div class="card__settings">
                                <div class="card__details">
                                    <div class="card__dates">
                                        <button class="card__date-deadline-toggle" type="button">date: <span class="card__date-status">${obj.dateDeadline ? `yes` : `no`}</span></button>
                                        <fieldset class="card__date-deadline"${!obj.dateDeadline ? ` disabled` : ``}>
                                            <label class="card__input-deadline-wrap"><input class="card__date" type="text" placeholder="23 September" name="date" value="23 September"></label>
                                            <label class="card__input-deadline-wrap"><input class="card__time" type="text" placeholder="11:15 PM" name="time" value="11:15 PM"></label>
                                        </fieldset>
                                            <button class="card__repeat-toggle" type="button">repeat:<span class="card__repeat-status">${obj.repeatDays ? `yes` : `no`}</span></button>
                                        <fieldset class="card__repeat-days"${!obj.repeatDays ? ` disabled` : ``}>
                                            <div class="card__repeat-days-inner">${renderCardDays(CARD_DAYS_ARRAY, index, obj.repeatDays)}</div>
                                        </fieldset>
                                    </div>
                                    <div class="card__hashtag">
                                        <div class="card__hashtag-list">${obj.hashTags ? renderHashTags(obj.hashTags) : ``}</div>
                                        <label><input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"></label>
                                    </div>
                                </div>
                                <label class="card__img-wrap">
                                    <input type="file" class="card__img-input visually-hidden" name="img">
                                    <img ${obj.image ? `src="${obj.image.src}" alt="${obj.image.alt}"` : `src="${ADD_PHOTO_URL}" alt="${ADD_PHOTO_ALT}"`} class="card__img">
                                </label>
                                ${renderCardColors(CARD_COLORS_ARRAY, index, obj.color)}
                            </div>
                            <div class="card__status-btns">
                                <button class="card__save" type="submit">save</button>
                                <button class="card__delete" type="button">delete</button>
                            </div>
                        </form>
                    </article>`
    };

    return cardsData.reduce((curVal, el, index) => {
        return curVal + renderCard(el, index + 1);
    }, ``);
};

filtersSection.innerHTML = renderFilters(FILTERS_DATA_ARRAY);
boardTasks.innerHTML = renderCards(CARDS_DATA_ARRAY);

const filters = filtersSection.querySelectorAll('.filter__input');
if(filters.length) {
    filters.forEach(function (el) {
        el.addEventListener('change', function () {
            boardTasks.innerHTML = renderCards(CARDS_DATA_ARRAY.slice(0,Math.floor(Math.random() * 5) + 1 ));
        });
    });
}