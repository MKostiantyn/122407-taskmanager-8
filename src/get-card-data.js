import getRandomDate from './helpers/get-random-date';
import getRandomInteger from './helpers/get-random-integer';
import getRandomElementsArray from './helpers/get-random-elements-array';
import chooseActiveColorClassName from './choose-active-color-class-name';

export default () => {
  return {
    title: [
      `Learn theory`,
      `Do homework`,
      `Pass intensive on a hundred`
    ][getRandomInteger(0, 3)],
    dueDate: getRandomInteger(0, 1) ? getRandomDate() : false,
    hashTags: new Set(getRandomElementsArray([`homework`, `theory`, `practice`, `intensive`, `keks`, `shopping`, `documents`, `tutorials`, `codewars`], 0, 3)),
    colorClassNames: chooseActiveColorClassName([`black`, `yellow`, `blue`, `green`, `pink`]),
    repeatDays: {
      'Mo': Math.random() > 0.5,
      'Tu': Math.random() > 0.5,
      'We': Math.random() > 0.5,
      'Th': Math.random() > 0.5,
      'Fr': Math.random() > 0.5,
      'Sa': Math.random() > 0.5,
      'Su': Math.random() > 0.5
    },
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    isFavorite: Math.random() > 0.5,
    isDone: Math.random() > 0.5
  };
};
