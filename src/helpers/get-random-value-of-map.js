import getRandomInteger from './get-random-integer';
export default (iterableObject) => Array.from(iterableObject.keys())[getRandomInteger(0, iterableObject.size - 1)];
