import getRandomDate from './helpers/get-random-date';
import getRandomInteger from './helpers/get-random-integer';
import getCardColorClassNames from './get-card-color-class-names';

const CARD_IMAGES_ARRAY_MOCK = [`img/add-photo.svg`, `img/sample-img.jpg`];

export default () => {
  return {
    dueDate: getRandomInteger(0, 1) ? getRandomDate() : false,
    colorClassNames: getCardColorClassNames(),
    text: [
      `This is example of new task, you can add picture, set date and time, add tags.`,
      `It is example of repeating task. It marks by wave.`,
      `Here is a card with filled data`,
      ``
    ][getRandomInteger(0, 3)],
    hashTags: new Set([`repeat`, `cinema`, `entertaiment`].slice(0, getRandomInteger(0, 3))),
    repeatDays: [
      Boolean(getRandomInteger(0, 1)),
      Boolean(getRandomInteger(0, 1)),
      Boolean(getRandomInteger(0, 1)),
      Boolean(getRandomInteger(0, 1)),
      Boolean(getRandomInteger(0, 1)),
      Boolean(getRandomInteger(0, 1)),
      Boolean(getRandomInteger(0, 1))
    ],
    image: {
      src: CARD_IMAGES_ARRAY_MOCK[getRandomInteger(0, 1)],
      alt: `task picture`
    },
    controlButtons: new Map([
      [`Edit`, true],
      [`Archive`, Boolean(getRandomInteger(0, 1))],
      [`Favorites`, Boolean(getRandomInteger(0, 1))]
    ])
  };
};
