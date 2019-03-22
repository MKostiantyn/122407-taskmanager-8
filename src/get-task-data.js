import {getRandomDate} from './helpers/get-random-date';
import {getRandomInteger} from './helpers/get-random-integer';
import {getRandomElementsArray} from './helpers/get-random-elements-array';
import {getObjectRepeatingDays} from './get-object-repeating-days';
import {
  COLOR_ARRAY_MOCK as colors,
  TITLE_ARRAY_MOCK as titles,
  HASH_TAGS_ARRAY_MOCK as hashTags,
  REPEATING_DAYS_ARRAY_MOCK as days
} from './get-mock-data';

export const getTaskData = () => {
  return {
    title: titles[getRandomInteger(0, titles.length - 1)],
    hashTags: new Set(getRandomElementsArray(hashTags, 0, 3)),
    colorClassName: colors[getRandomInteger(0, colors.length - 1)],
    repeatingDays: getObjectRepeatingDays(days),
    dueDate: Math.random() > 0.5 ? false : getRandomDate(),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    isFavorite: Math.random() > 0.5,
    isDone: Math.random() > 0.5
  };
};
