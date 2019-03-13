import getRandomInteger from './helpers/get-random-integer';
export default (array = []) => {
  const randomActiveIndex = getRandomInteger(0, array.length);
  return array.reduce((accumulator, item, index) => accumulator.set(item, index === randomActiveIndex), new Map());
};
