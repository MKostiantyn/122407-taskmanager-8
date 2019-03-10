import getRandomValueOfMap from './helpers/get-random-value-of-map';
export default () => {
  const CARD_COLORS_ARRAY_MOCK = new Map([
    [`black`, false],
    [`yellow`, false],
    [`blue`, false],
    [`green`, false],
    [`pink`, false]
  ]);
  return CARD_COLORS_ARRAY_MOCK.set(getRandomValueOfMap(CARD_COLORS_ARRAY_MOCK), true);
};
