import {getRandomInteger} from './get-random-integer';

export const getRandomDate = () => {
  const randomDayMilliseconds = Math.floor(Math.random() * 7) * getRandomInteger(1, 24) * getRandomInteger(1, 60) * 60 * 1000;
  const randomDayWithSign = Math.random() > 0.5 ? -randomDayMilliseconds : randomDayMilliseconds;
  return Date.now() + randomDayWithSign;
};
